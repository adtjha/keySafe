export const Pricing = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-start pt-24 gap-12'>
      <h1 className='w-fit text-8xl font-bold'>
        <span className='block'>Pricing</span>
      </h1>
      <div className='w-fit p-6 group max-w-4xl flex flex-col items-center group border-2 bg-primary-light/10 border-primary-light rounded-2xl'>
        <div className='title text-3xl font-bold mb-8 group-hover:underline'>
          Base
        </div>
        <div className='title text-2xl font-bold mb-8'>$20</div>
        <div className='features flex flex-col items-center justify-center gap-4'>
          <div className='w-full flex flex-row items-start justify-between space-x-16'>
            <div className='w-fit flex flex-col items-start justify-start'>
              <a className='w-fit text-lg uppercase font-bold' href='/'>
                User key and secret
              </a>
              <p
                className='text-primary-text/60 text-sm w-full text-left'
                href='/'>
                We maintian user keys and secret for you. You can manually add
                or remove users access from our dashboard.
              </p>
            </div>
            <h6 className='w-fit'>✔</h6>
          </div>
          <div className='w-full flex flex-row items-start justify-between space-x-16'>
            <div className='w-fit flex flex-col items-start justify-start'>
              <a className='w-fit text-lg uppercase font-bold' href='/'>
                Oauth Compliant Process
              </a>
              <p
                className='text-primary-text/60 text-sm w-full text-left'
                href='/'>
                We follow Oauth Client Credential grant type in order to
                securely provide an authentication for your backend apis.
              </p>
            </div>
            <h6 className='w-fit'>✔</h6>
          </div>
          <div className='w-full flex flex-row items-start justify-between space-x-16'>
            <div className='w-fit flex flex-col items-start justify-start'>
              <a className='w-fit text-lg uppercase font-bold' href='/'>
                Analytics and reporting.
              </a>
              <p
                className='text-primary-text/60 text-sm w-full text-left'
                href='/'>
                You can track your
                <ul className='pl-4 list-disc'>
                  <li>api usage</li>
                  <li>successful requests count</li>
                  <li>failed requests count</li>
                  <li>prominent reason for failed requests</li>
                  <li>user analytics</li>
                </ul>
                We send you monhtly reports related to your api usage.
              </p>
            </div>
            <h6 className='w-fit'>✔</h6>
          </div>
        </div>
        <div className='callToAction w-fit bg-primary-light mt-4 px-8 py-4 rounded-2xl text-lg font-medium group-hover:underline'>
          Buy Now.
        </div>
      </div>
      {/* <h1 className='w-fit text-4xl font-bold text-primary-text-60'>
          Chargeable in Future
        </h1> */}
    </div>
  );
};
