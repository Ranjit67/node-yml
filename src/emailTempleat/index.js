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
  background: #fcce19;
  color: #fff;
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
`

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

`

const tableHead = `
 <tr>
        <td align="center" colspan="100%">
          <img
            src="https://yardhotel.in/static/media/logo.b978b057.png"
            class="img-logo"
            alt=""
          />
        </td>
      </tr>`

const tableFooter = `
<tr>
        <td align="left" class="icon-link">
          <img src="https://yardhotel-api.herokuapp.com/assets/mail-icon.png" height='20px' alt="" class="icon-margin-right">
        <a href = "mailto: info@yardhotel.live">info@yardhotel.live</a>
      </td>
        <td >
          <div class='icon-link'>
            <img src="https://yardhotel-api.herokuapp.com/assets/website-icon.png" height='20px' alt="" class="icon-margin-right">
           <a href = "https://yardhotel.live/" target="_blank">yardhotel.live</a>
          </div>
          </td>
         
      </tr>
      <tr>
         <td colspan="100%" align="center">
           <div>
             <b>Follow us on social media</b>
           </div>
           <div>
             <a href="https://twitter.com/Yard__Hotel" target="_blank">
              <img src="https://yardhotel-api.herokuapp.com/assets/twitter-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://in.pinterest.com/yardhotel1/_saved/" target="_blank">
              <img src="https://yardhotel-api.herokuapp.com/assets/pinterest-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.tumblr.com/blog/view/yardhotelsearchingyard1" target="_blank" >
               <img src="https://yardhotel-api.herokuapp.com/assets/tumblr-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.facebook.com/yardhotelsearchingyard" target="_blank">
                <img src='https://yardhotel-api.herokuapp.com/assets/fbIcon.png' height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.linkedin.com/company/yardhotel/" target="_blank">
                 <img src="https://yardhotel-api.herokuapp.com/assets/linked-in-icon.png" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.instagram.com/yardhotel/" target="_blank" >
                  <img src="https://yardhotel-api.herokuapp.com/assets/instagram-icon.png" height='25px' alt="" class="social-icon">
             </a>
           </div>
          </td>
      </tr>`

module.exports = {
  confirmationMail: (
    email,
    guestName,
    hotelName,
    bookingDate,
    checkInDate,
    checkOutDate
  ) => {
    return `
   <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for booking with us!</title>
    <style >
    ${bookingMailStyle}
    </style>
  </head>
  <body>
    <table class="tbl-bordered">
      <tr>
        <td align="left">
           <img
            src="https://yardhotel.in/static/media/logo.b978b057.png"
            class="img-logo"
            alt=""
            width="170px"
          />
        </td>
        <td align="right">
          <th align="right">
              <p>Booking ID: 1925298010 </p>
              <p>Hotel Booked On: 10/11/2021</p>
          </th>
        </td>
      </tr>
     
      <tr >
        <td colspan="100" align="center">
          <h2>Thanks alot for booking with us!!!</h2>
          <span>Your booking at Ginger hotel is confirmed.</span>
        </td>
      </tr>
      <tr>
        <td colspan="100" align="left">
           <ul class="square">
             <li>You have booked your stay at {hotelName} from {checkInDate} to {checkOutDate}.</li>
             <li>You have reserved {selectedRoomNumbers} rooms.</li>
             <li>You have paid {paidAmount}.</li>
           </ul>
           <div class="item-center">
             <a href="">
               <button class='manage-app-btn'>Manage In App</button>
             </a>
           </div>
        </td>
      </tr>
      <tr>
        <td colspan="100" align="left" >
         <p>{Hotel Name}</p>
         <p>{Hotel address}</p>
          <p>987654321</p>
          <p>someone@example.com</p>
          <div class='margin-tb'>
            <span class="color-red font-bold">Please Note:</span>
            <ul class="square">
             <li>For any special request, kindly contact.</li>
             <li>Do not forget to carry a valid ID proof.</li>
           </ul>
          </div>
        </td>
      </tr>
      <tr>
        <td align="left">
          <p>{totalDays} Night(s) Stay</p>
        </td>
        <td align="center">
          <b>CheckIn</b>
          <p>{checkInDate}</p>
        </td>
        <td align="center">
          <b>CheckOut</b>
          <p>{checkOutDate}</p>
        </td>
      </tr>
      <tr>
         <td align="left">
          <p>Guests</p>
        </td>
        <td align="center">
          <b>Primary Guest</b>
          <p>{displayName}</p>
          <p>{userEmail}</p>
          <p>{userPhone}</p>
        </td>
      </tr>
      <tr>
        <td align="left">
          <p>{numberOfRooms} Room(s)</p>
        </td>
        <td align="center">
          <b>Room Type</b>
          <p>{type1}</p>
          <p>{type2}</p>
        </td>
      </tr>
      <tr>
        <td align="left" >
          <p>Amount Paid</p>
        </td>
        <td align="center">
         <p>INR3000</p>
        </td>
      </tr>
      <tr>
        <td align="left">
          <p>Payment Price Breakup (in INR)</p>
        </td>
        <td align="center">
         <p>INR3500</p>
        </td>
      </tr>
      
       <tr>
        <td colspan="100" >
          <div class='icon-link' style="display: flex; justify-content: space-between; align-items: center;">
            <div class='icon-link'>
              <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" height='20px' alt="" class="icon-margin-right">
            <a href = "mailto: info@yardhotel.live"><span>yardhotel@gmail.com</span></a>
            </div>
             <div class='icon-link'>
            <img src="https://cdn-icons-png.flaticon.com/512/975/975645.png" height='20px'   alt="" class="icon-margin-right">
           <a href = "https://yardhotel.live/" target="_blank"><span>yardhotel.live</span></a>
          </div>
          </div>
      </td>
      </tr>
      <tr>
         <td colspan="100%" align="center">
           <div>
             <b>Follow us on social media</b>
           </div>
           <div>
             <a href="https://twitter.com/Yard__Hotel" target="_blank">
              <img src="https://cdn-icons.flaticon.com/png/512/3536/premium/3536424.png?token=exp=1636613022~hmac=f1e1466f5fa7db26b6a20eb7a4d79fdc" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://in.pinterest.com/yardhotel1/_saved/" target="_blank">
              <img src="https://cdn-icons.flaticon.com/png/512/3536/premium/3536559.png?token=exp=1636612965~hmac=9370135148860e2da8c5e95fd05f6914" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.tumblr.com/blog/view/yardhotelsearchingyard1" target="_blank" >
               <img src="https://cdn-icons.flaticon.com/png/512/3536/premium/3536602.png?token=exp=1636613247~hmac=873b0635c39f362f92161bcd8de593e1" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.facebook.com/yardhotelsearchingyard" target="_blank">
                <img src='https://cdn-icons-png.flaticon.com/512/733/733547.png' height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.linkedin.com/company/yardhotel/" target="_blank">
                 <img src="https://cdn-icons.flaticon.com/png/512/3536/premium/3536505.png?token=exp=1636613414~hmac=f36c7b8113fcc619775324b6713d89e4" height='25px' alt="" class="social-icon">
             </a>
             <a href="https://www.instagram.com/yardhotel/" target="_blank" >
                  <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" height='25px' alt="" class="social-icon">
             </a>
              
           </div>
          </td>
      </tr>
    </table>
  </body>
</html>
   `
  },
  cancellationMail: (guestName, hotelName, bookingDate) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Thank you for booking with us!</title>
      <style>${MailStyle}</style>
    </head>
    <body>
      <table class="tbl-bordered">
      ${tableHead}
      <tr>
        <td class="bg-expo" colspan="100%" align="center">RAPIDLY GROWING HOTEL & TOUR INDUSTRY</td>
      </tr>
      <tr>
        <td>
          <h3>Dear ${guestName}</h3>
          <p>
         This email is to confirm your booking on ${bookingDate} at the ${hotelName} is cancelled. We've issued a refund from our part. While this refund is immediate on our part, it may take upto 5 business days to reflect in your account.
          </p>
          <br />
          <p>
           If you have any inquiries, please do not hesitate to contact us or call the hotel directly.
          </p>
          <br />
          <p>
           We are looking forward for your next stay with us.⁣
          </p>
            <br />
          <b>
            <p>Best Regards⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣</p>
            <p>YardHotel</p>
          </b>
        </td>
      </tr>
      ${tableFooter}
    </table>
    </body>
    </html>
       `
  },
  checkInMail: (guestName, hotelName, checkInDate) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Thank you for booking with us!</title>
      <style>${MailStyle}</style>
    </head>
    <body>
      <table class="tbl-bordered">
     ${tableHead}
      <tr>
        <td class="bg-expo" colspan="100%" align="center">RAPIDLY GROWING HOTEL & TOUR INDUSTRY</td>
      </tr>
      <tr>
        <td>
          <h3>Dear ${guestName}</h3>
          <p>
         This email is to confirm your check-in on ${checkInDate} at the ${hotelName}. We welcome you to ${hotelName} & hope that you will have a delightful stay.⁣
          </p>
          <br />
          <p>
           If you have any inquiries, please do not hesitate to contact us or call the hotel directly.⁣⁣⁣
          </p>
          <br />
          <p>
          We are looking forward for your happy stay.⁣
          </p>
            <br />
          <b>
            <p>Best Regards⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣</p>
            <p>YardHotel</p>
          </b>
        </td>
      </tr>
      ${tableFooter}
    </table>
    </body>
    </html>
       `
  },
  checkOutMail: (guestName, hotelName, checkOutDate) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Thank you for booking with us!</title>
      <style>${MailStyle}</style>
    </head>
    <body>
      <table class="tbl-bordered">
     ${tableHead}
      <tr>
        <td class="bg-expo" colspan="100%" align="center">RAPIDLY GROWING HOTEL & TOUR INDUSTRY</td>
      </tr>
      <tr>
        <td>
          <h3>Dear ${guestName}</h3>
          <p>
        This email is to confirm your check-out on ${checkOutDate} from the ${hotelName}. We thank you for choosing this stay with us & hope that your stay was delightful.
          </p>
          <br />
          <p>
           If you have any inquiries, please do not hesitate to contact us or call the hotel directly.⁣⁣⁣
          </p>
          <br />
          <p>
         We are looking forward for your future travels.⁣⁣⁣
          </p>
            <br />
          <b>
            <p>Best Regards⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣</p>
            <p>YardHotel</p>
          </b>
        </td>
      </tr>
      ${tableFooter}
    </table>
    </body>
    </html>
       `
  },
  billMail: (guestName, hotelName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Thank you for booking with us!</title>
      <style>${MailStyle}</style>
    </head>
    <body>
      <table class="tbl-bordered">
      ${tableHead}
      <tr>
        <td class="bg-expo" colspan="100%" align="center">RAPIDLY GROWING HOTEL & TOUR INDUSTRY</td>
      </tr>
      <tr>
        <td>
          <h3>Dear ${guestName}</h3>
          <p>
        Thank you for choosing ${hotelName} for your stay & choosing YardHotel for your booking. We are pleased to confirm receipt of your booking. Kindly find the bill below.⁣        
        If you have any inquiries, please do not hesitate to contact us.⁣        ⁣⁣⁣⁣⁣⁣
        We are looking forward for your future travels.⁣⁣⁣⁣
          </p>
          <b>
            <p>Best Regards⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣</p>
            <p>YardHotel</p>
          </b>
        </td>
      </tr>
      ${tableFooter}
    </table>
    </body>
    </html>
       `
  },
  normalMailBody: (content) => `
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
          <td class="bg-expo" colspan="100%" align="center">RAPIDLY GROWING HOTEL & TOUR INDUSTRY</td>
        </tr>
        <tr>
          ${content}
        </tr>
        ${tableFooter}
      </table>
    </body>
  </html>
  `,
  holidayMail: (guestName) => `
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
        <td class="bg-expo" colspan="100%" align="center">RAPIDLY GROWING HOTEL & TOUR INDUSTRY</td>
      </tr>
      <tr>
        <td>
          <h3>Hi ${guestName}</h3>
          <p>
        Thanks for showing your interest in booking your holidays with YardHotel. Its really our pleasure to provide you the best of services in order to make your holiday plan memorable.⁣
          </p>
          <br />
          <p>
          We have received all your details regarding your holidays plan and team is currently working on that you offer you the best holiday package.⁣
          </p>
          <br />
          <p>
         Our team will get you back soon with all the details. Till then, if you have any further queries then kindly feel free to reach us anytime.⁣
          </p>
          <br />
          <b>
            <p>Thanks⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣</p>
            <p>Team YardHotel</p>
          </b>
        </td>
      </tr>
      ${tableFooter}
    </table>
    </body>
  </html>

    `,
  contactUsMail: (guestName) => `
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
        <td class="bg-expo" colspan="100%" align="center">RAPIDLY GROWING HOTEL & TOUR INDUSTRY</td>
      </tr>
      <tr>
        <td>
          <h3>Hi ${guestName}</h3>
          <p>
        Thanks for reaching us out with your requirements. We are actively working to fulfill all your needs & give you the best of services.⁣⁣⁣
          </p>
          <br />
          <p>
          We have received all your details regarding your query and team is currently working on that.⁣⁣
          </p>
          <br />
          <p>
        Our team will get you back soon with all the details. Till then, if you have any further queries then kindly feel free to reach us anytime.⁣⁣
          </p>
          <br />
          <b>
            <p>Thanks⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣</p>
            <p>Team YardHotel</p>
          </b>
        </td>
      </tr>
      ${tableFooter}
    </table>
    </body>
  </html>

    `,

  partnerRequestMail: (guestName) => `
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
        <td class="bg-expo" colspan="100%" align="center">RAPIDLY GROWING HOTEL & TOUR INDUSTRY</td>
      </tr>
      <tr>
        <td>
          <h3>Dear ${guestName},</h3>
          <p>
        Thank you for your interest in becoming a partner with YardHotel! We have received your request and our team is currently going through all the details.Once your request is approved from our team, you will receive an email along with a call back from our team to proceed further.
          </p>
          <br />
          <p>
         Thanks alot again for showing interest in our partner program.If you have any questions, please do not hesitate to contact us by email info@yardhotel.live .
          </p>
          <br />
          <b>
            <p>Best Regards</p>
            <p>YardHotel</p>
          </b>
        </td>
      </tr>
      ${tableFooter}
    </table>
    </body>
  </html>

    `,
}
