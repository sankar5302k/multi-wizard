import DataCard, { DataCardContent } from '@/components/data-card';
import PageTitle from '@/components/page-title';
import SalesCard from '@/components/sales-card';
import BarChart from '@/components/bar-chart';
import { observer } from 'mobx-react-lite';
import { useLanguageTranslation } from '@/hooks/ui/useLanguageTranslation';
import {
  useGetData,
  useGetSalesData,
} from '@/hooks/rq/queries/useMultipleDependentQueryData';
import { ReloadIcon } from '@radix-ui/react-icons';

export const Dashboard = observer(function Dashboard() {
  const { t } = useLanguageTranslation();

  const [
    {
      data: mainData,
      isLoading: mainDataLoading,
      isFetching: mainDataFetching,
    },
    { data: barData, isLoading: barLoading, isFetching: barFetching },
  ] = useGetData();
  const {
    data: userSalesData,
    isLoading: salesLoading,
    isFetching: salesFetching,
  } = useGetSalesData(mainData?.salesId);

  return (
    <div className="flex w-full flex-col  gap-5">
      <PageTitle title={t('DASHBOARD.TITLE')} />

      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <DataCardContent>
          <p className="relative flex p-4 font-semibold">
            Overview
            {barLoading || barFetching ? (
              <ReloadIcon className="absolute right-0 mr-2 h-4 w-4 animate-spin" />
            ) : null}
          </p>

          <BarChart data={barData} />
        </DataCardContent>
        <DataCardContent className="flex justify-between gap-4">
          <section>
            <p className="relative flex ">
              Recent Sales
              {salesLoading || salesFetching ? (
                <ReloadIcon className="absolute right-0 mr-2 h-4 w-4 animate-spin" />
              ) : null}
            </p>
            <p className="text-sm text-gray-400">
              You made 265 sales this month.
            </p>
          </section>

          {userSalesData?.map((d, i) => (
            <SalesCard
              key={i}
              email={d.email}
              name={d.name}
              saleAmount={d.saleAmount}
            />
          ))}
        </DataCardContent>

        {/*  */}
      </section>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {mainDataLoading || mainDataFetching ? (
          <ReloadIcon className="inset-0 m-auto mr-2 h-14 w-14 animate-spin" />
        ) : null}
        {mainData?.cardData.map((d, i) => (
          <DataCard
            key={i}
            amount={d.amount}
            description={d.description}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
    </div>
  );
});
