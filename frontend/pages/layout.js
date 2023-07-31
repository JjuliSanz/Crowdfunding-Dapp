import React from "react";
import { Button, Card, CheckBox, Donate, Filter, Footer, Form, Header, Loader, Login, Logo, Notification, Product, Profile, SignUp, Upload } from "../Components";
const layout = () => {
  return (
    <div className="home">
      <Header/>
      <Logo />
      <p>Button</p>
      <Button/>
      <p>NOTIFICATION</p>
      <Notification/>
      <p>FILTER</p>
      <Filter/>
      <p>Card</p>
      {/* <Card/> */}
      <p>LOADER</p>
      <Loader />
      <p>Product</p>
      <Product/>
      <p>PROFILE</p>
      {/* <Profile /> */}
      <p>DONATE</p>
      <Donate/>
      <p>FORM</p>
      <Form />
      <p>LOGIN</p>
      <Login/>
      <p>SignUp</p>
      <SignUp/>
      <p>UPLOAD</p>
      <Upload/>
      <p>CHECKBOX</p>
      <CheckBox/>
      <p>Footer</p>
      <Footer/>
    </div>
  );
};

export default layout;
