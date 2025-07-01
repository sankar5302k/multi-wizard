import { makeAutoObservable } from 'mobx';

import { CacheKey } from '../common/constant';
import { UserData } from '../type';
import { LocalStorage } from 'shared';

type ExchangeTokenAction = (currentRefreshToken: string) => Promise<{
  accessToken: string;
  refreshToken: string;
}>;

export class AppState {
  private _user: UserData | null = null;

  private _ready = false;
  private _preferSidebarOpen = false;

  private _exchangeTokenActionCallback: null | ExchangeTokenAction = null;

  constructor() {
    makeAutoObservable(this);
    this._loadData();
  }

  private _loadData() {
    this._populateUserData();
    this._loadSidebarPreference();
  }

  get ready() {
    return this._ready;
  }

  private _setReady(value: boolean) {
    this._ready = value;
  }

  get user() {
    return this._user;
  }

  get preferSidebarOpen() {
    return !!this._preferSidebarOpen;
  }

  private _loadSidebarPreference = () => {
    this._setPreferSidebarOpen(
      !!LocalStorage.get<boolean>(CacheKey.PreferSidebarOpen),
    );
  };

  private _setPreferSidebarOpen = (open: boolean) => {
    this._preferSidebarOpen = open;
  };

  savePreferSidebarOpen = (open: boolean) => {
    this._setPreferSidebarOpen(open);
    LocalStorage.save(CacheKey.PreferSidebarOpen, open);
  };

  setUser = (userData: UserData | null) => {
    this._user = userData;
    LocalStorage.save(CacheKey.User, this._user);
  };

  removeUser = () => {
    this._user = null;
    LocalStorage.delete(CacheKey.User);
  };

  removeSidebarPreference = () => {
    this._setPreferSidebarOpen(false);
    LocalStorage.delete(CacheKey.PreferSidebarOpen);
  };

  get authTokenVersion() {
    return this.user?._authTokenVersion;
  }

  get isUserAuthenticated() {
    return !!this._user?.id;
  }

  setLoginInfo(params: {
    userId: string;
    accessToken: string;
    refreshToken: string;
  }) {
    const { userId, accessToken, refreshToken } = params;
    // const {  programId } = parseJwt(accessToken);
    this.setUser({
      _authTokenVersion: 0,
      accessToken,
      // email: email.toLowerCase(),
      id: userId,
      // permissionList,
      refreshToken,
    });
  }

  private _populateUserData = () => {
    const userData = LocalStorage.get<UserData>(CacheKey.User);
    this.setUser(userData);
    this._setReady(true);
  };

  logout = () => {
    // TODO: Reset other state data
    this.removeUser();
    this.removeSidebarPreference();
  };

  private _exchangePromise: Promise<null> | null = null;

  setExchangePromise = (promise: Promise<null> | null) => {
    this._exchangePromise = promise;
  };

  exchangeOnlyOnce = async () => {
    if (this._exchangePromise) {
      return this._exchangePromise;
    }

    try {
      this.setExchangePromise(this._exchangeToken());
      await this._exchangePromise!;
    } finally {
      this.setExchangePromise(null);
    }
  };

  setTokens = (accessToken: string, refreshToken: string) => {
    if (this.user) {
      this.setUser({
        ...this.user,
        _authTokenVersion: this.user._authTokenVersion + 1,
        accessToken,
        refreshToken,
      });
    }
  };

  setExchangeTokenAction = async (cb: ExchangeTokenAction) => {
    this._exchangeTokenActionCallback = cb;
  };

  private async _exchangeToken() {
    const refreshToken = this.user?.refreshToken;

    if (refreshToken) {
      try {
        const result = await this._exchangeTokenActionCallback?.(refreshToken);

        if (result) {
          this.setTokens(result.accessToken, result.refreshToken);
        }
      } catch (e) {
        return null;
      }
    }

    return null;
  }
}
