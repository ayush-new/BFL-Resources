import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PlaystoreIcon from "../../images/playstore-icon.png";
import QRCode from "../../images/qrcode-app.png";
import MobileApp from "../../images/mobile-app.png";
import WishlistCard from "../../images/card.png";
import { mobileAppLang } from '../../language/mobileAppReference/en/mobileAppReference';
import { isServer } from '../../util';
import { changeLanguage } from '../../actions/common.action';
class MobileAppReference extends Component {
  state = {
    mobileAppDownloadTranslation: mobileAppLang
  }
  componentWillMount() {
    const { match, language, handleLanguageChange } = this.props;
    if (!isServer) {
      handleLanguageChange(match.params.language)
      this.getlanguage(language);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      this.getlanguage(nextProps.language);
    }
  }
  getlanguage = (language) => {
    const languageResponse = import(`../../language/mobileAppReference/${language}/mobileAppReference`);
    languageResponse.then(response => {
      this.setState({
        mobileAppDownloadTranslation: response.mobileAppLang
      })
    })
  }
  render() {
    const { mobileAppDownloadTranslation } = this.state;
    return (

      <Fragment>
        <div className="download-page-container">
          <div className="download-upper-container">
            <div className="download-page-wrap">
              <h1>{mobileAppDownloadTranslation.mainHead}</h1>
              <h3 className="main-subheading">{mobileAppDownloadTranslation.mainSubheading}</h3>
              <p className="main-description">{mobileAppDownloadTranslation.mainDescription}</p>
              <div className="playstoreIconContainer">
                <img src={PlaystoreIcon} className="playstore-icon" />
              </div>
              <div className="mobileAppContainer">
                <img src={WishlistCard} className="wishlistCard" />
                <img src={MobileApp} className="mobile-app-image" />
              </div>
            </div>
          </div>
          <section className="qr-code-section">
            <div className="download-page-wrap">
              <div className="qrCode-Container">
                <img src={QRCode} className="qrcode-app" />
              </div>
              <div className="qrCode-desc-container">
                <h3 className="qrcode-description">{mobileAppDownloadTranslation.qrCodeDescription}</h3>
                <input type="number" placeholder="eg. +971 555000555" className="phoneNumber-input" maxlength="10" onkeypress="return isNumberKey(event)" />
                <button className="Send-Button" >{mobileAppDownloadTranslation.buttonText}</button>
                {/* <input type="button" className="sendButton" value="Send SMS"/>Send SMS */}
              </div>
            </div>
          </section>
        </div>
      </Fragment>

    )
  }
}

const mapStateToProps = reduxState => ({
  language: reduxState.common.language
});

const mapDispatchToProps = dispatch => ({
  handleLanguageChange: bindActionCreators(changeLanguage, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileAppReference))

