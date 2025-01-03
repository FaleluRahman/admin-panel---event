"use client";

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const PageLoader = () => {
    return (
<ProgressBar
        height="3px"
        color={"#c41a72"}
        options={{ showSpinner: false }}
        shallowRouting
      />
    );
}

export default PageLoader; 