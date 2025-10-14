
import React from "react";
import "./PharmacyBanner.css";
import { FaPrescriptionBottle, FaExchangeAlt, FaSyringe, FaShoppingCart, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";

function PharmacyBanner() {
  return (
    <div className="pharmacy-banner">
      {/* Blue top section */}
      <div className="pharmacy-header">
        <div className="pharmacy-text">
          <h2>Welcome to Pharmacy</h2>
          <p>
            Offering low cost prescriptions, friendly service, & convenient
            locations.
          </p>
        </div>
        <div className="pharmacy-img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
            alt="Pharmacist"
          />
        </div>
      </div>

      {/* Yellow middle strip */}
      <div className="pharmacy-delivery">
        <span>🚚 Pharmacy delivery now available!</span>
        <a href="#">How it works</a>
      </div>

      {/* Sign-in section */}
      <div className="pharmacy-signin">
        <div className="signin-content">
          <span className="signin-icon">👤</span>
          <p>Sign in to track and manage your prescriptions</p>
        </div>
        <button className="signin-btn">Sign in or create account</button>
      </div>

      {/* --- SECTION 1: 3 Feature Cards --- */}
      <div className="pharmacy-cards">
        <div className="card">
          <FaPrescriptionBottle className="card-icon" />
          <h3>Refill prescriptions</h3>
          <p>Quickly refill prescriptions in just a few steps.</p>
          <button className="card-btn">Refill</button>
        </div>

        <div className="card">
          <FaExchangeAlt className="card-icon" />
          <h3>Transfer prescriptions</h3>
          <p>Easily transfer prescriptions to any Walmart Pharmacy.</p>
          <button className="card-btn">Transfer</button>
        </div>

        <div className="card">
          <FaSyringe className="card-icon" />
          <h3>Schedule a vaccine</h3>
          <p>Stay protected against the flu, COVID-19 & more.</p>
          <button className="card-btn">Schedule</button>
        </div>
      </div>

      {/* --- SECTION 2: Info Section --- */}
      <div className="pharmacy-info">
        <div className="info-left">
          <h2>
            Get eligible prescriptions & more delivered as soon as today with no
            order minimum fees.
          </h2>

          <div className="info-item">
            <span className="info-icon">💊</span>
            <div>
              <strong>Your Rx is filled by a Walmart pharmacist</strong>
              <p>Same professional service, same low cost.</p>
            </div>
          </div>

          <div className="info-item">
            <FaShoppingCart className="info-icon" />
            <div>
              <strong>When the Rx is ready add it to your cart</strong>
              <p>You’ll receive a notification on how to get started.</p>
            </div>
          </div>

          <div className="info-item">
            <FaTruck className="info-icon" />
            <div>
              <strong>Choose how and when to receive your Rx</strong>
              <p>Delivered with your groceries & essentials.</p>
            </div>
          </div>
        </div>

        <div className="info-right">
          <img
            src="https://i5.walmartimages.com/asr/23f4d8b6-01f2-44e7-8fda-b31ad35b6e15.7fa2f1f5e87d99d9cbe57fa68c44c299.png"
            alt="Grocery Bag"
          />
        </div>
      </div>

      {/* --- SECTION 3: For all your Rx needs --- */}
      <div className="pharmacy-rx-section">
        <h2>For all your Rx needs</h2>
        <div className="rx-cards">
          <div className="rx-card">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhISEhMWFhUXFRcVGBUVFxUVFRUXFxUWFxUXFxUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lICYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLi0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xABAEAABAwIEAwUFBgQGAQUAAAABAAIRAwQFEiExBkFREyJhcZEyQoGhsQcUUsHR8BUjkuEzYnKiwvHSFiRzgrL/xAAaAQADAQEBAQAAAAAAAAAAAAACAwQBAAUG/8QALhEAAgICAgEEAQIEBwAAAAAAAAECAxEhEjEEEyJBUTIzYQVCcYEUI5GxweHw/9oADAMBAAIRAxEAPwC7VbDVrW7fNFXDnMyd7SQIUw9tvkk+Ml3atOsT6KLwnJtpv4G2QS6+yXEMJFZ7XHkoMSwzuFgcRomxqw1pXlehn+KfO6bitjK4RjLoo3DeCPoXJfMiDr5qXjKoSZg7bq6tscomELiVsx1MyBsUEZN6Zlrjy9qPnzES7tHalSYfZ1ansuOib8T2IY+QPNNOA6ebOInVPlHjpoU60io3oqUnZS4qIXr/AMRT7juxcytmOxEKsgLFFP4EN4GNlfv7RnePtN+oX03gly00mkHkF8rNVlw/jS7pNDWu08ZQTrz0HXKOfcfSRqjqtw8Ruvnln2kXo5tW5+0m9IiQhVTQ1zr+yz/bBiZa6kGO5mVzgYxV/EosUxOrXfnqOkoNMVUcbRO5b0MhjNX8S9/jVX8SWrEXpQ+jOQy/jVb8Sw4zV/Elq8WelD6O5DE4xV/EtTi1X8SYcNYEK0vf7AaXQNyBIInlrA9eiS3gZncKclgMAncxoT5EyR4EII+nKTil0blnX/sZvy5lYPdJziPRdTL18u8PY/VtH5mbHcK5D7Wqsf4XzC6Vb6Q2DjjbO2F6ScWPP3err7h+i5hS+1Su85W0tfPQDmT4JTjXF1W5dFRxyDZjdGnxPVTyqee2PiotaLPwI6lRpwajc53BcJ9FbMPsTdVRVf8A4bD3R+Ijn5LidwCSDMMidNI8PNT2OO3dBwdSr1GxyDjlI8tj5FNUUdjWEfSjoDYVS4gxdzJY3dJMC45qXDBTe3+aRoW6B/w5FKsauqjZNRpB8UFkm9I6K49gV9XOpJ1VLxS4cXxyRF/jBJMLbA8HrXlVrGNIaTq+DAHPXqthFR2zZT5dCdzWrF0532POJ0ufVn91iZkXku9Fzs0lE16AIkqm4xj1W2IL2nKNytbLj+i/crK4Qj0DiSLJWoOkHkFva4zSdUFMESOShtcYZVbA5oN+H0hUziA7rzXTjn8fgbGWPyLRVqgiEnxOn3HeSKt8obMyoK7S4HVdUpKacjJ4awjlnE1g5zSQJTf7OsHezM53NWK4w7NpCaYPTDDEL0fISlLkLjNcMMpvH3D1SsW5eRVAxHh2rS1K71ipETCSVsLbW3ChlJpgWVJxyuzhnYnothSPRdmdwSzcAeiT3OD0WOyuaJXeo0IVE30zmXZHosFIrpP8Ot+gXv8ADLfoFnqmvx7Ps5t2ZXvZnoultwm36BSNwe36Bb6hn+HtOYdmV6KR6K94v2FBwBo5gdnSAPop7W9tGZajWEEEdBAO5n1S5eVFa+QfRsXbKtgvDFau7vA06Y3c4QTEd1oPMg6GI0V6FjY2zHE0GSHGC4Z3GRsCZnTkj7rEKbchaDUDySIiBAJ1I5GDqqDxVjLjVIDjIdqRAZ0AAHTWevwUFlttzxnH7IdGCiEsvMrLl1JpyvzVHbbuzDK0ACG9/boFWf4c4GHDkCrHhlUup5mgHqOQj2j8xurZgeG0zTDqgE7axOiZ4t0lPg/nv+xzrb6OY18OIEwgzSPRdpr4bQI1A+SrfElpb0KLqgaM2w8+voCvR5g+jNvRRoLAKLBNR8Zo3HRquvD/AAUXQ6qNenIfqVXuAqbXValzWOgMDQklx2AA30XUsMxei5xYH978LgWu9CpLZvOD1qK0o5/0Aa/AlN7SJ36dVQrnBja1qlB+rdHNPr+gXaqVcdVzn7SqJ7ejU90ywnxgwujLGDZRznRXKdbIQ5hgjvtPMFpB+k+i6liDRfWVOq0d5ze9HJw0d8/quPOf7J8froV1T7JbzNa1aR9x4P8AUI/4prJ5I2wjgikaUvGvTkrZhVlTpUw2mwADTQIiiNY5LfE76nQplxgeCXCHF8mzrLHLSPRQrHWQFiGw7HGVabageBmnSRpBI/JYm5iI4sB4nwlle3qMgSWmPNcEwjCHG4NJ/dynVfRjmy4DkqfxvwmDUZcUO6/Z0bOCF9NlFLXNJhHCeHMaAN/FG8UYNLWupmHD5hecPWrqbAHbptdVMwhTNuNctbGX4dmnlFYZa1GsmdUoHET2VMjgrnUpaQqreYTNbMQpPE8m3HuHV0Vzlhjyyuc4BhTdo1pkoe0pRACjxDDXP2JXqq6WCe2iCnxWiS/u2uC0sq4BQtTDXMaSeihwcOc+CimnhMDikmi2NrgsXGePatb70chMZeXmV2oUAGKj4pg3aViRqY6Lpy4paBprU3t4OTOubgbkq2YQMtJpeSXkBxncSNAPCIPxTvEOFX6S2B1hDYhasazLIBYInnA2HkvP867MFHGNh31RrSalkquK3zw/LTJEHU9PBesun03fzahIiRGmbznl5JzVtWGn2gd3c0CInNuQZ8JVVxOrmfESRpBiSPDyRxs9qhH67FWLjjDGFXEg9paTOx36KMU3yQY0HI76ckqtTke15Et1PXNpzHwRTbjQkgjlHPXZDKt/1AiuXY4bitQDIx5DZB2h3daRE9IJCU1qOjyTIgx+/ggHXXey5tz6H4o00ycwaQWiBJMAg6LsOPYLj9DPD2Flu0sntHOl0yAAAQNOczPxTyxcarHA1S2pyBMA6ehHzELzhzDO0HcdmiA7WYkTqBsrD/6bJGwTIR5VN9S+H/74NimUSrfXAJaXGQSD5jQoHGa9R1A5yTLg0fFdKfwtmcXZQJVT+0LC/u9FjiNO0Gg8B/dV81KK1hjIKWdhXD+AOfZ02U3FjyM+Zpg97+0Iy14VuWuaX1S6Hd0PHeaJ5Okz+iNw6/FuQw+61rRp0aB66JmzHmtrjtpbI0Pu7D57qJTbbR6vp4Sa+jTiPtWNinm0gEtjNJ6Tt5qh4tj4rUhTL6he1wOWqwB2m8OAH0XT6d9SqSZDmOMbHQ9DPNVT7Q7Ci2jnYNQQJJJgHzRRaQElJo5720t8oXSPsarA1bimebA/+lwH/JcttjofJXf7Mrw07kkc2PH0P5Kl6IntHcamVo5Bcj+0XiYuq/d6ALyDBjYHp4q/Po9q053EnzSuy4doB+YtEgyhl1l9ARX0co/guJHUUHx5/wB1i78HsGmixdzRvFgNHEgdzqsvLzMIGq4xaYhd5njNq1WLhHFK9R5z6rZTgloJUSzstl7i/ZEArSjjsnQSgscoF7mDxTOysgHNGXkiofOnnMC2OJ4RozGiXZSIKPDZ1IUFzho7TNCYEDLCTNuO8DcJL2shouEoxtcIahQ5rcMkooWcllIBp/JNWYHghBWWHNa+QmMQNEsdcPY8kjRO5LGwN9IevZpCCtrLK4k81JQuiRMGFrdViR3QsnLPQMVgLcG84K5T9olP+e9pDYLQWhsTERLo1meqtOJ3dajTfU0EePM6BUa2wt106rUNYtyjNUfJMCHHNHvQQPVS+Q1NKPyDZ9CnC6jGMqsrOqBuUvYWajtWjQPaTBa4SPAweqqmKXOd2doI5kdDsdfgjrhzs+Rrzl2Dsrmk+Y1KCuLGq1gqEhzScsEw8/D/ALWVxS7AWeiGgZhxid94cfGOa8c8hzWTs4R4dPRafc6hMw4CNNtPhuvXUjFM6yMoJPIz+Sdr7HzpsrXvi1n7WCEwwmSZmCRyE6wnd2whgAHSPVAX9BmdznCWiJ1gHXX4mEzNUPbTDIOnIGIjaY3HRLsecMDGjo/2ZWuW3c5xANR8tEiS1oAmN4mVe6LAqz9m3DDre37d5aXVqdNzQ2Za2CYdyJ1HlrrqrYx0btWJySKquHHfZrUowuf/AGsURUtQ0cnE/QLpTqgI2VN4+thUt3COTzt0puP5LW3lBx4YaEllUZcUXF3vtBkGHNcRDoI2IcCPgmmC2FLKG1TUc9vvZ2vB8SypsfKVUcHuDbveHeyTn8iQNR4HTRW+zxm0cBLmj4pfUiqLzE1xNlw+adMNNMa9o7+W9pBkQ1sh3yVT45uXijleRuAY2JT7GeMbWkCGvzHkG66rm3EF5UuXBzu6xurWc/NyOEOUk/gCy1Ri0gS1GseH5hW7gSn/AO6pN6h3/wCT+iqtm2XfD8/7K3cGtP36nHutcf8AaqH0RnWqVsW7KenaTqlVzWuA2WNLvABIb7F8RYYFu4zzgoFJYwA85Lt/D2fsrFzipjGNAkfdXf0k/MLF2voHLFdjT/nXA/eyZ8HXNOnOYgGeaeXWH0g5rmgS4akc/NUnjnDHU4fSkazpskxhiW/2KL7lLio95Z0itd0TBzBbUsXpAzIXGbJ9eo4A1HKyUsGf2ZcXOOk77KpNdIyfjTS5SOksxBlX2TKkDhCpXB05T3p1Vke0xustwniQMK3jKHlGo2FvRISLC3ukyjm3AB1KCucVqKMsraexq5wQdy1qj+8gjdLq19qQnJp9i3FrosdFzYGuiwUwQktnXGifW7gQtSyC3gRcSWBrUm0R79RrSfwgAuJ/2hVjiC2o29F1G2Il+j88vLmSXa/GI8BPRXy7YHHINgJd5HZvx+g8VzfjxgDhUaSS85Mo1ktG4j4aKW6OOhtMFJ+45de53VXM1jNoOvn1XRcG4apZWPuQXva3QTApTyDdjtrKqvB9i59y+tVaQ2mSQHAiXT3d+kT6LolG5a4d7l5RE7aqLyreLUUz0/C8VcPU47zr9v6FLxG1ZmqNB1DjlMRI8UmoYPUq1AymGwXd8u0aBG5jfyVxfhzSalSBBcQAdCPFp1HqPirFY1Gso5A0ZQNtB8ddzKSruOGj2vMshfS6nFvrb/4KPY8DOdchlYN7LLnLhPe1gNgjTqrrQ4SsWCG27YbGsnQ9ZlTYJWzuqGf2AT+aTYnb1fvRdUa51IgBpaJYBGxB0BleXf5Ft1zhzcUl8Ps8SdEKFhRyy44XUFu1zaZPZNk5HGQ0alxaTq3npqPBPLS7p1mBzDyBg6ET1CqeH2Z7MseO66QGkzDHD2SfVBW15TtLssEimQGkZi4NJAM6nbQfNUfwz+IzVjqseV9/X9ya+jOHFYb+C91KjG7kKu8bYnQZbDNUb3nEQfaINN40budx6qW9vminnGsyGSQBUPKCTtpPiFVf4G14e6uM73kFzndAZAHRo5AL6Kc4onrrb2xBxMGuqF1L2S1saR7onTzCQGwc7dXnEsIJggb7D6IS+wd7Kce87T9+im57L0lg5rcODXGBt6/2RNKmcknc6/AIq5wl7HOD2uBPskggFFutoaB8PgOfrKrUlgjcXkAtKeUyen9/0Vk4MqEXjTzMjXxbAS21wWvXM0qbiDEGIBkxudOQR9TAr62Da1Sg5hZHeBa4GDIMtJgjxXPaMO5YPU7ozaFMXtBVV4YxplzbtrU99nt5seN2n6jwITM4g4ckyDSjgmlF5G2ixV6pilSTDdFiB3IZ6X7ib73T25hQYlbCvSLY9UR/C2tyvO6YWoBGgXSniXECG/cc0p8M1KbxB5q8WOHg08p6LTiKjUBbkGpITfDLF2UZt4WxWG8FN3kysilL4FthhLaYOUIwUV5WY9j45IjIYQTcfyYELGo4RFb24aSvX2OdSu0CltK4TaOElyiLtlLpiivRNM76IKoZKd4tbZ9QgqGGkGSEyVbzoBWa2F4fazCc+w2egn0Qli2CisRbLCBzCHpGZywKvcltMAf4lQ6f6nc/Jo+TVS+JrJrzSYHFppudBGvIaOHPkrnY0wHZ3GXHSeQH4WjkPqqdjulbzLneriB8mhS37jspp/IV06VRoIccwgQ4SZ5mRuOS0NwC4U2nXmOgTNw7p8o9dEXkHTZebKpfB69XlOPaEFS4mq2mNQ3kmGIVtmN3PyRLbGmHZgwA9RofktqmHMLg+TPiZCROqSXtK4+ZW5b0b2duGAZRBjfmfE9VHjHEXY0nCBnOjZ8efkNTHgjaNAx7XySDiThOvcOBZUpho2Dsw+gK8+nwJztTsWjPWplL3sWNxy4LGFtapMkzoQ74cvLZZe187w57w4nmCGDMBrMzC8o8E3jffo/1v/8AFH3OA13ZYo0WPB1fTqOg6b5XAwfIr2XRXlPCX9hvkx8eyyE4TSS7Wv8AphvC1wH5aVRxJptPZtJBAaT3tBz2+CsvYfsaKn2PD9w2syq8tEGTD3OMbxqOe3xVtoV87oa1x8jP/FPg9YPM8uFcZ/5byv8AYmbSMzv57jyUWI0ZDXDWHAkc/FM6WHPP+XzP6BEWtjDgS0TzMzOmndjrCeqpP4IXbFbyU/ictdTBgBu8kbQMxMHWRCoFV7XOyjpl8j0+o8yunfaFYOrNY1pjcbTMxp8kls+CxStm1HEOeHBxkwIkaT5T6rXBxbOViklkY8GUyxhpO911N7D1Y8zp8SVeskyDt8lTbFwY6iBLiwlk7AsBzMn4O6ckfjN/cFhFOo2l4tbmd/U7T5IoXRitgWUylLQq4ZsBZ3uIUxpRIp1Gjl3y4tA8u+PIBWilfU3cwq5gNs+rbtq3Ds9UyM5AzFoc7KCRvufVOKWDMLZGh6hEuTeV0JlptMZgtWIVmGQBv6leo+DAyD1T3UVYMELypBAjovKFUN3WS/UR0fxJby2kg9FKx8IC8xdjRqQlVbiFvu6o5SSNjFy+Bpfu5qShqElGJhwklS2mIh2yROHqR0FuLwxjcsQlOhLpBQt5iBAJVXp8XEVS0hOq41x4gzUpbOhvdA1UlO5YRuFW6OK9o1D03uDp8VvrZ6MdTXZZH1suqgrYmDpKX3d13DqlPbkSUEp4YyFeUWFlVvVVjG3fz/8A6j81XMQ4jqse4DYJ7irj2wnfKAfMbpV8k46N8eWZtEo2HmPqEY0oWmNv3yU7FCy5EwWFascslCaF0yFIahQrN1ICtMJpXrVG0r0lajg3DrcOJLthpyM9d05tGADTb0+iVUTlDWczqUztST5L1KoKMUiC2XJhcr1kLUsB6oG9aaZFRhO8OZycDzHQj9U1vGxSWdEONVRo1sZzz/C33j5nYf2Q9Nk768v+hyXlCjqSdyZJ80SGqGcnN5+C6EVBYFDqOWuADpEx6hZiD4a4noUZXABzc0AafavFPkfaPRvP9Pik8d4Q/Ossa4Lb5baiCNezaT5kSfqmuHuaCWlaikSNAhbi0JMgkEdF6DTWjzW8vI5cWrFVn9vJ5r1A5v6O4r7PGXktgcksxnEHNYQN+SPs6EHwKExbC3Pe2NkFtzUXJIZXXHkkylY5ZVxQzl3ivOFKLnNl5J81b+IcJfUo5AUDgmE9m2HJE1OyGi2mVccg99Yue3uGERgdu9gh0yn1nQAUb295M8VSgnFkl7Up5RDWpy0jwVLucIiqXeK6AaYhI8SYNUeJOWTMrBJhpGRRXN1BQtkDBR1NjS3VEv2O/qBVr6Rqh6l53fBFU7AOJjVQX2EOGwQxeWFPKQlp2AqPGm7gPUp5fd6vUP8AncPgCvcIwhzXtcZgOB9DKyhq5x6kn1XeSlFJIX4y22E0h9FuFq0fv9+a3CgZcbNXrVtGi8CE0mjmvGFesOi8K4wlBW7HKJhUtRhkTufkn0R5SF2SwguxBc7z+ifUmwEtw6jDZ5kaeXJMKNbYHQr0kQy7CAUovrnO6B7Lfmealxi+yNgEZjoOuvNK7VT+RZ/Kijx6/wCZhtNZVqwo6lUAJddXY1U7lgqjDLN7muSQBqSYAG5J2RdGzdR31cdSfyHgo8CaGu7WoNY7o/DPPzKsNdoeJ9E+iv8AmfZNfbviuj2yrAgKS6GkoBlTKjPvILU2U/smwDyF6h3h06LFN/ikF6bB7YiY6KO8xFrHZTuvKEZ3BA4nbZ6gJ5Jsdx2FJbIsQxiNgT9FTsf4iqsIAGhPJXi8tWinqFReIsOqOLA1ukrpWOM1FGximsl04er5qTXHmF5imIMZrOqptW5ubemA0EiN0JYuq1zmdPkiguKbQSr5ywWeti5do3mprewe/daWFhlAVosqcAIqbI2oG6DqYmZhBaFLTwNxBMqwuYIRtFghN9KKEu6TeSsYTYlryCmOJUWgSjRS70oLHT3SsUVFGzsc3kDe5opOPRpPoCqnYGU6oOOQg7EQfI6FJ7JkEjoYUvkvod467C2fmf0/JSBYHBSCFGVmNOi9LVq4r0FAEbsK2leZSvXQ0EuOi448adWjqQExbRzVI5Dfy5/kkeE3PaV591su/pGnzVqsaUCTu7U+Su8aOia94YU0dFu+GjVCm9aNGDMf9vrz+ChqPJ1efgNAnyuiuhMaZPsGuaJqVJ5D6n9NvVSOhoUVxiLW6BLq97OpUU5pvJfXBpYJbm4W+CYf2rw947g1j8UbfBBWNM1XjMO7v5q5WVINbHMpvj0cnykJ8i/iuMRfiTgXQENh985rhTOx2PRGX9sS4EfFBV7Y5m8td1dFqLwRJje4paShn90Sm1G2lolAXtAiRyKVZBMxPZlDEGZRO6xJzhh6lYlqvC6Dcj19UZsw3XoqZtVUMNxF1SuAPZKtN5ctoxPNdzw9dBuHw+xjcQacJY99MkNMSlt3jcggKnW15WddjfLK6yaXuMjF4wzpdxbMcwgjkq9ZYeGudlHNWeg2WfBBvy05JUXjVznOU29Mf6igsGtNsBMbWqEkZiDXmAU3taYhejRVGsl8i2Uwt9bZMKNTupY6mJCOe4BqfJonWTTthKXY4/urW1uO+VrjLwRolRllDmsC61ZLYSquIdUd5n0C3q3NZlWg1re4SczuvdOnkFtebebmj1cJ+UqTyHl4K6YOKy/k9AW4Q9evlS6riikKVFsclbNKX0ruBLiAPFesxOmTDXAnoDJPkEJuGMjWhV3H7yoXBo9k7Qm1KwrVN/5bfH2j8OXxTC2wqiyM3eI5u1/6RxTybpCzha1c2SWkgx4SN4nzhWdwc72zp+EaD49VAboAaIatep3PWBfDLyMH1WtQVavm3MBLq11znTxQjLl1QxTDneMQB+qHctILUdsY1q1MaQCo6Nm6sRAysnVx6eHit7XAXvjNMeeUfLU+qtFG3bTYBEjwGydX428yE2eThYiQUqTW6gezp8tEytIIlCFoIJHP/pQ4bX7xb0VieCF7HZYEDd0Ai2hR13ADVa+gSKjfZRBU9QZ2SfNKKm8pxZPa9ob4Je+gtCn7wFiNqYQyTC9WYZxQsMwssuDlb3RzRnFTNGTtIT+0AA0SriVhLdFLLMaP3KovNuwXCbalU6Ere8w1jKgLQJSjhgltRwJVnu3Ad4lHXJzrOkowsaYHiOMdjTMrndXiGrc1iwSGzurRxBVNZpDRshuFrRpcZbBB6KS/zJVZUFkbDxlJJt4DcPw80xmR1LG2NOUlGXzIbAVTrU6bnmTBTvBst25geXGMoJR7LZTxthI1Td9yHM0VOscLadRKPo3RY8NJV0p5IIwa7Hlpa6yiqtqOaltNQCpagQRWEMk8lY4vty23z09HscCCOU/sKvYdi3aMPbMLHt73dMh4AObKInMBJjnCv2I2naUns6t0jqNQuW4pZupw7s6gJPvF2hGoO6ValnZZ4+HHDHVfC2VWB7KrwHAEHQgg7EeCnsOG7cgEl7vEuiSP9MIWxw2o6nTa6pDG7hnvjUhv+Vo205DkngqBunRIwkUPrAFe8LWr9CHx/wDJUH0KMw7Dba3B7Gk1p5mJcfNx1K1fcT4IS5v2MEvOnTmfJZn6M4/Yxq3JQr66rd1jr3nLTblkwCdYHWFtYCpUqbkhunhPP9+a2MHJnSmkh5VuYQnaucYa38/+kztMMLtwn9lh7W7ABPhQied+BFYYA55DqhPkrPZ2DWCAAFOxkc1I2evyVMYJEspuRs1q2DVqCeqySjABCzK7L8UnujkrB3Iplcd2qDycPmNP0QmPU+6HdCgfRo8oPkAqSvbZgl+AVMzQU6c4AarY77BaeRTcWsBB0rns3gjbWU+a4OSPEaUEjqskvoJZWmQXGIuLiQdFiANsfFeqbgxuUbsrhgglLa97nfl5Lm2JcZvquIpGADut8ExWs2oCTMrrJRrXEOEHN5Rfb11OhNTwVVvOKnVX9mzbqmV/SfXpnxUmA8MNAa6NeaQ584exDGvTl7hxglABgnchNKFFrJIG63ZaNAELS7rhoUtHjZfv7NssTfJA2I3IErnmKve6rLQY8Fd20DVdPJNKGEU+YC9OKwsImlLLyV/hu/lmVwM7JxaYdmfmhN6GGUxsEZTpBuyNIBm9uyAApSFrTKlKIxmoCGxegX0aga0OdlJY0kAOcBLRJ2k6T4otq2XNZRyeHk47w/gV5RrOdcks0Lsgce8507gGAB+isDKummvjOnqrnieD060k6OIAnWDHUc+ireO4VVo03OY0VNDl91rXAaB3QE6ZuXOFNOtl9V0cbAH12MALjuYA6noBzQlzRzHO8eAb+EfqtcCvKdw3tAC2o3RzHe0w8wPCf7pmaWb981O284GNp7K/d1WsiGwToCrJgdmA0KE4Gx7g5+YHkQYjwEJxZ4dUZo2sCOQewT/U0j6KyqvCJbLExhQpgItjwoKPaj2msd/pcR8iFOH/AIqZHofoqETslDh1W4cOqibk5aLZECSLV9QAaqPKeRg/vkvc06OAXHC2/uAXiOQ+uqJdR7VhHUJdfsy1PDb4Jph1xDYSk28hMXYNXNImk7ca/BNalQv0/JVTHL99G4Dg0nNA0T/Cr15EubGnVZzS0w4KXaDTeCk3VQ3EuZ2hHj4qG7e550bp15KY1c7crnCNkuVyjHYfp5l0CB4KxTjDOj/ksXK0H0z5owod4q24aNQsWKTzu2VeL0i+4UO4muHblYsR+H+khXk/mwyuq9iB7yxYmR/FimOsMHdCYtWLE6PQt9k7FjlixacSU1KvFi1HM3C9CxYtMNl6sWLDTl+OsDMTeGANkNJyiJJaJJhWXD2jM7T3P+SxYpF+qWS/TQUwaolq9WK5EjJKZ2RVMrFiJAM3IURCxYtMPQtnLFi40T4z7Q8gpsP3CxYlR/JhPoX8TD2T4hEUCYYsWKbySjx+yw0wMh8lzW8cfvB195YsU1/4o9D+H/lMsdNxgalYsWLyh5//2Q=="
              alt="Refrigerated Rx"
            />
            <h3>Refrigerated Rx, delivered</h3>
            <p>
              Now you can get GLP-1s, insulin, antibiotics & more to your door.
            </p>
            <button className="learn-btn">Learn more</button>
          </div>

          <div className="rx-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTaFcNlmXdTORaVQs7EId5J7FGEsEXTQH60w&s"
              alt="Specialty pharmacy"
            />
            <h3>Specialty pharmacy</h3>
            <p>Offering personalized, affordable care for all.</p>
            <button className="learn-btn">Learn more</button>
          </div>

          <div className="rx-card">
            <img
              src="data:image/jpeg;base64,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"
              alt="Diabetes management"
            />
            <h3>Simplify diabetes management</h3>
            <p>ReliOn™ makes it affordable & accessible.</p>
            <button className="learn-btn">Learn more</button>
          </div>
        </div>
      </div>
      {/* --- SECTION 4: Additional Pharmacy Services --- */}
<div className="pharmacy-services">
  <h2>Additional pharmacy services</h2>
  <div className="services-grid">
    <div className="service-card">
      <div className="service-left">
        <div className="service-icon">💊</div>
        <div>
          <h3>Low cost prescriptions</h3>
          <p>30-day supply of generic Rx's starting at $4.</p>
        </div>
      </div>
      <span className="arrow">›</span>
    </div>

    <div className="service-card">
      <div className="service-left">
        <div className="service-icon">🔎</div>
        <div>
          <Link to="/medication-therapy"><h3>Medication therapy management</h3></Link>
          <p>Get answers to your medication questions.</p>
        </div>
      </div>
      <span className="arrow">›</span>
    </div>

    <div className="service-card">
      <div className="service-left">
        <div className="service-icon">📍</div>
        <div>
          <Link to="/find-pharmacy"><h3>Find a Pharmacy</h3></Link>
          <p>Locations, hours, contact info and more.</p>
        </div>
      </div>
      <span className="arrow">›</span>
    </div>

    <div className="service-card">
      <div className="service-left">
        <div className="service-icon">⏱</div>
        <div>
          <h3>Same day treatment</h3>
          <p>Get tested & treated for strep throat, flu & COVID-19.</p>
        </div>
      </div>
      <span className="arrow">›</span>
    </div>

    <div className="service-card">
      <div className="service-left">
        <div className="service-icon">📅</div>
        <div>
          <h3>Birth control prescribing</h3>
          <p>Now at select Walmart pharmacies.</p>
        </div>
      </div>
      <span className="arrow">›</span>
    </div>
  </div>
</div>

    </div>
  );
}

export default PharmacyBanner;
