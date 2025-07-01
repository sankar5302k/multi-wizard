import WizardForm from '@/components/WizardForm';

const WizardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Account Setup Wizard
          </h1>
          <p className="text-lg text-gray-600">
            Complete your profile in just a few steps
          </p>
        </div>
        <WizardForm />
      </div>
    </div>
  );
};

export default WizardPage;
