import './App.css';
// import Workshop from './Workshop/Workshop';
// import Checkid from './Registration/CheckId';
import Interface from './OredYour3DProduct/Interface';

// import Event from "./Event/Event"
// import Shop from "./Shop/Shop"

// import Form from './Form/WorkShop_form'
// import WorkShopMore from './WorkShopMore';
// import Aboutus from "./Aboutus/Aboutus";

import Signin from './Signin/Signin';
import Signup from './Signin/signup';

import ForgetPassword from './Signin/ForgetPassword';
import Otpverification from './Signin/Otpverification';
import WorkShopRegistration from './Registration/WorkshopRegistration'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import ResetPassword from './Signin/ResetPassword';
import VerifyYourself from './Signin/VerifyYourself';
import Congratulation from './Signin/Congratulation'
import Signupverification from "./Signin/signupverification"
import dashboard from './Dashboard/dashboard';
// import FooterPopup from './Dashboard/footerPopup';
// import SignoutPopup from './Dashboard/SignoutPopup';
// import Invoice from './OredYour3DProduct/InvoicePage'

import Tiket from './OredYour3DProduct/Tiket';
import Tiket1 from './OredYour3DProduct/Tiket1';
import Tiket2 from './OredYour3DProduct/Tiket2';
import AskFor3DFile from './OredYour3DProduct/AskFor3DFile';
import StartYourJourney from './StartYourJourney/StartYourJourney';
// import Hometemp from './Home/Hometemp';
import Error from './Signin/Error';
import {useEffect} from "react"


import DashboardHome from './Dashboard/DashboardHome';
import ReactGa from "react-ga"


import FinalIntro from "./StartYourJourney/finalIntro"

import Askforrepair from './OredYour3DProduct/AskForRepair';
import Services from './Home/Services';
// import Event from "./Event/Event"
// import Shop from "./Shop/Shop"
// import Form from './Form/WorkShop_form'
// import WorkShopMore from './WorkShopMore';
// import Aboutus from "./Aboutus/Aboutus";
import Homesite from './Home/Homesite';
import AboutUs from "./About/AboutUs";
import Nav from "./Navbar/Nav";
import Footer from "./Footer/Footer";
import Service from "./Services/Services";
import Store from "./Our_Store/Store";
import PrivacyPolicy from "./Legal/PrivacyPolicy"
import Condition from "./Legal/Condition";
import Community from "./Community/Community";
import Homeblog from "./Home/Homeblog";

function App() {
  useEffect(() => {
    ReactGa.initialize('UA-221388951-1')
    ReactGa.pageview(window.location.pathname)
    console.log(window.location.pathname)
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Switch>
            <Route exact path="/" component={Homesite}/>
            <Route path="/homeblog" component={Homeblog}/>
            <Route path="/about" component={AboutUs}/>
            <Route exact path="/service" component={Service}/>
            <Route path="/our_store" component={Store}/>
            <Route path="/privacy_policy" component={PrivacyPolicy}/>
            <Route path="/conditions" component={Condition}/>
            <Route path="/community" component={Community}/>
          {/* <Route exact path="/home" component={Home} /> */}
          <Route exact path="/services" component={Services} />
          <Route exact path="/order3d" component={Interface} />
          {/* <Route exact path="/invoice/:_id" component={Invoice} /> */}
          {/* <Route exact path="/checkyouorder/:_id" component={Tiket} />
          <Route exact path="/checkyouorder1/:_id" component={Tiket1} />
          <Route exact path="/checkyouorder2/:_id" component={Tiket2} /> */}
          <Route exact path="/3d_design" component={AskFor3DFile} />
          <Route exact path="/askforrepair" component={Askforrepair} />
          {/* <Route exact path="/enroll" component={WorkShopRegistration} />
          <Route path="/dashboard" component={dashboard} />
          <Route path="/signin" component={Signin} />
          <Route path="/error" component={Error} />
          <Route path="/signup" component={Signup} />
          <Route path="/:id/verify/:token" component={Congratulation} />
          <Route path="/:id/resetpassword/:token" component={ResetPassword} />
          <Route path="/verifyyourself" component={VerifyYourself} />
          <Route path="/otpverification" component={Otpverification} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <Route path="/signupverify" component={Signupverification} />
          <Route path="/dashboardhome" component={DashboardHome} />
          <Route path={"/syj"} component={StartYourJourney} />
          <Route path={"/tell"} component={FinalIntro} /> */}
          {/*
          <Route exact path="/reg/:UniqueCode" component={Checkid} />
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/dashboard" component={dashboard}/>
          <Route path="/:id/verify/:token" component={Congratulation}/>
          <Route path="/:id/resetpassword/:token" component={ResetPassword}/>
          <Route path="/verifyyourself" component={VerifyYourself}/>
          <Route path="/otpverification" component={Otpverification}/>
          <Route path="/forgetpassword" component={ForgetPassword}/>
          <Route path="/signupverify" component={Signupverification}/>
          <Route path="/science" component={science}/>
          <Route exact path="/order" component={Firstint} />

          <Route exact path="/order2" component={Secondint} />
          <Route exact path="/order3" component={Thirdint} />
          <Route exact path="/footer" component={FooterPopup}/>
          <Route exact path="/sopopup" component={SignoutPopup}/>
          */}
          {/* <Route exact path="/form" component={Form} />
          <Route exact path="/readmore" component={WorkShopMore} />
          <Route exact path="/event" component={Event} />
          <Route exact path="/3d_design" component={AskFor3DFile} />
        <Route exact path="/shop" component={Shop} /> */}
          {/* <Route exact path="/aboutus" component={Aboutus} /> */}
          {/* <Route exact path="/workshop" component={Workshop} /> */}
          {/*<Route exact path="/" component={Workshop} />*/}
          {/*<Route exact path="/"  component={Workshop} />*/}
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;