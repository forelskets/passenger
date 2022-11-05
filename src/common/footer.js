import React, { useState, useEffect } from "react";
import { useLocation } from "react-router"
import { Breadcrumb, Layout, Menu, Drawer } from 'antd';
import images from "./../themes/appImage";
import {
  Link,
  useNavigate

} from "react-router-dom";
import { appConstants } from "../themes/appConstant";
const { Header, Content, Footer, Sider } = Layout;

const FooterMain = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="footer">
        <div className="container-fluid">
          <div className="row d-flex footer-draw">
            <div className="">
              <div class="wrapper footers">
                <img src={images.logohome} style={{ width: '' }} />
                <h2 className="black-line">Subject to status. Over 18 only.</h2>
              </div>
            </div>
            <div className="">
              <div class="wrapper footers first_text">
                <h4>In the office</h4>
                <ul className="lisit-trends">
                  <li><Link className="footer_links" to="/finance" >{appConstants.finance}</Link></li>
                  <li><Link className="footer_links" to="/about">About Us</Link></li>
                  <li><Link className="footer_links" to="/careers">Careers</Link></li>
                  <li><Link className="footer_links" to="/press">Press</Link></li>
                  <li><Link className="footer_links" to="/terms">Terms & Conditions</Link></li>
                  <li><Link className="footer_links" to="/privacypolicy">Privacy Policy</Link></li>
                </ul>


              </div>
            </div>
            <div className="">
              <div class="wrapper footers second_text">
                <h4>On the go</h4>
                <ul className="lisit-trends">
                  <li><Link className="footer_links" to="/faq">FAQ</Link></li>
                  <li><Link className="footer_links" to="/contactUs">Contact Us</Link></li>
                </ul>


              </div>

            </div>
            <div className="">
              <div class="wrapper footers icons-footer" style={{ textAlign: 'right' }}>
                <h4>Follow us</h4>

                <img src={images.fb} style={{ width: '30px' }} />
                <img src={images.tw} style={{ width: '30px' }} />
                <img src={images.youtube} style={{ width: '30px' }} />
              </div>
            </div>



          </div>
        </div>
      </div>
      <div className="copyright">
        <p>The Passenger Hub Ltd. Registered in England, Scotland, Ireland and Wales.</p>

      </div>

    </div>
  )

}
export default FooterMain