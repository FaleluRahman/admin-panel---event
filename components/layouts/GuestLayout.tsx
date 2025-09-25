import React from "react";
import SideMenu from "../sidemanu";
function GuestLayout(props: any,cat:string) {
    console.log(cat);
    
  return (
    <div>

            {/* <SideMenu active={props.active}/> */}

    </div>
    // <main className="flex w-full flex-col">
    //     <Header/>
    //     {/* <SubHeader active={cat}/> */}
    //   {props.children}
    //   <GtFooter />
    // </main>
  )
}

export default GuestLayout;
