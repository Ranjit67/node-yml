const MailStyle = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
body {
  background: #fafafa;
}
.img-logo {
  width: 180px;
  margin: auto;
}
.tbl-bordered {
  border: 1px solid #ddd;
  width: 800px;
  margin: 20px auto;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
}
tr {
  border: 1px solid #ddd;
}
th {
  display: block;
}
th,
h3 {
  padding: 10px 0;
}
td {
  padding: 10px;
  line-height: 1.7em;
}
.bg-expo {
  background: linear-gradient(to right, #BB0A01, #40559B);
  color: #fff;
}
.btn-a {
  color: #fff;
    padding: 12px 30px 12px 30px;
    background: linear-gradient(to right, #BB0A01, #40559B);
    border-radius: 10px;
    width: 100px;
}

.btn-primary-contained {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  font-size: 20px;
  text-align: center;
  font-weight: 500;
  border: none;
  outline: none;
  text-decoration: none;
  display: inline-block;
  margin: 5px 0;
}
.link {
  text-decoration: none;
}
.icon-link {
  display: inline-flex;
  align-items: center;
  gap: 1em;
}
.icon-margin-right {
  margin-right: 10px;
}
.social-icon {
  margin: 0.5em 0.2em !important;
  cursor: pointer !important;
}
a {
  text-decoration: none;
}
@media only screen and (max-width: 600px) {
  table {
    width: 100% !important;
  }
  tr td {
    width: 100% !important;
    display: block !important;
  }
}
`;

const bookingMailStyle = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
.tbl-bordered {
  border: 1px solid #ddd;
  width: 800px;
  margin: 20px auto;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  background-color: whitesmoke !important;
}
td,
th {
  padding: 1em;
}
tr {
  border: 1px solid #ddd;
  line-height: 1.6em;
}
ul.square {
  list-style: square;
  line-height: 1.6em;
  margin-left: 1em;
}
.manage-app-btn {
  background-color: #fcce19;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0.2em;
  font-size: 1.1em;
  padding: 0.7em !important;
  float: center !important;
  margin: 1em 0 !important;
}
.item-center {
  width: 100%;
  text-align: center;
  padding: 0.5em 0 !important;
}
.color-red {
  color: red;
}
.font-bold {
  font-weight: bold;
}
.margin-tb {
  margin-top: 1em;
  margin-bottom: 1em;
}

.icon-link {
  display: flex;
  align-items: center;
}
.icon-margin-right {
  margin-right: 10px;
  align-self: center !important;
}
.social-icon {
  margin: 0.5em 0.2em !important;
  cursor: pointer !important;
}
a {
  text-decoration: none;
}

@media only screen and (max-width: 600px) {
  table {
    width: 100% !important;
  }
  tr td {
    width: 100% !important;
    display: block !important;
  }
}
td {
  column-span: 100% !important;
  align-items: center !important;
}

`;

const tableHead = `
 <tr>
        <td align="center" colspan="100%">
          <img
            src="https://yardhotel.in/static/media/logo.b978b057.png"
            class="img-logo"
            alt=""
          />
        </td>
      </tr>`;

const tableFooter = `
<tr>
        <td align="left" class="icon-link">
          <img src="https://yardhotel-api.herokuapp.com/assets/mail-icon.png" height='20px' alt="" class="icon-margin-right">
        <a href = "mailto: support@skyrisecelebrity.com">support@skyrisecelebrity.com</a>
      </td>
        <td >
          <div class='icon-link'>
            <img src="https://yardhotel-api.herokuapp.com/assets/website-icon.png" height='20px' alt="" class="icon-margin-right">
           <a href = "https://skyrisecelebrity.com" target="_blank">sky-rise.com</a>
          </div>
          </td>
         
      </tr>
      <tr>
         <td colspan="100%" align="center">
           <div>
             <b>Follow us on social media</b>
           </div>
           <div>
             <a href="https://skyrisecelebrity.com" target="_blank">
              <img src="https://yardhotel-api.herokuapp.com/assets/twitter-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://skyrisecelebrity.com" target="_blank">
              <img src="https://yardhotel-api.herokuapp.com/assets/pinterest-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://skyrisecelebrity.com" target="_blank" >
               <img src="https://yardhotel-api.herokuapp.com/assets/tumblr-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href=https://skyrisecelebrity.com" target="_blank">
                <img src='https://yardhotel-api.herokuapp.com/assets/fbIcon.png' height='25px' alt="" class="social-icon">
             </a>
             <a href="https://skyrisecelebrity.com" target="_blank">
                 <img src="https://yardhotel-api.herokuapp.com/assets/linked-in-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://skyrisecelebrity.com" target="_blank" >
                  <img src="https://yardhotel-api.herokuapp.com/assets/instagram-icon.png" height='25px' alt="" class="social-icon">
             </a>
           </div>
          </td>
      </tr>`;

module.exports = {
  normalMailBody: (content: string) => `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Thank You!</title>
      <style>${MailStyle}</style>
    </head>
    <body>
      <table class="tbl-bordered">
        ${tableHead}
        <tr>
          <td class="bg-expo" colspan="100%" align="center"> SKY RISE CELEBRITY</td>
        </tr>
        <tr>
          ${content}
        </tr>
        
        
        ${tableFooter}
      </table>
    </body>
  </html>
  `,
  linkEmail: (content: string, link: string) => `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Thank You!</title>
      <style>${MailStyle}</style>
    </head>
    <body>
      <table class="tbl-bordered">
        ${tableHead}
        <tr>
          <td class="bg-expo" colspan="100%" align="center">SKY RISE CELEBRITY</td>
        </tr>
        <tr>
          ${content}
        </tr>
        
           <tr>
           <td  colspan="100%" align="center">
           <a href =${`"` + link + `"`} class="btn-a" >CLICK</a>
           </td>
           
          
        </tr>
            
        
        
        ${tableFooter}
      </table>
    </body>
  </html>
  `,
};
