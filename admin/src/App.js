import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { ToastContainer } from 'react-toastify'
import EmailVerifyForgotPassword from './views/pages/forgotPattern/EmailVerifyForgotPattern'
import { AppSidebar } from './components'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const TwoFactorAuthentication = React.lazy(() =>
  import('./views/pages/2faAuth/TwoFactorAuthentication'),
)
const VerifyEmailForgotPattern = React.lazy(() =>
  import('./views/pages/forgotPattern/EmailVerifyForgotPattern'),
)
const VerifyEmailForgotPassword = React.lazy(() =>
  import('./views/pages/forgotPassword/VerifyEmailForgotPassword'),
)
const ForgotPattern = React.lazy(() => import('./views/pages/forgotPattern/ForgotPatteern.js'))
const TwofaForgotPattern = React.lazy(() =>
  import('./views/pages/forgotPattern/TwofaForgotPattern'),
)
const TwofaForgotPassword = React.lazy(() =>
  import('./views/pages/forgotPassword/TwoFaVerifyForgotPassword'),
)
const ForgotPassword = React.lazy(() => import('./views/pages/forgotPassword/ForgotPassword'))
const ChangePattern = React.lazy(() => import('./views/pages/changePattern/OldPattrnCheck.js'))
const ChangePatternMain = React.lazy(() => import('./views/pages/changePattern/ChangePattern.js'))

const ChangePassword = React.lazy(() => import('./views/pages/changepassword/ChangePassword.js'))
const TwoFaLogin = React.lazy(() => import('./views/pages/login/TwoFaLogin'))

const NewLogin = React.lazy(() => import('./views/pages/login/NewLogin'))

const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route
              exact
              path="/twofactorauth"
              name="Two Factor Page"
              element={<TwoFactorAuthentication />}
            />
            <Route exact path="/twofalogin" name="Two Factor Login" element={<TwoFaLogin />} />
            <Route
              exact
              path="/verifyemailforgotpattern"
              name="Forgot Pattern Verify Email"
              element={<VerifyEmailForgotPattern />}
            />
            <Route
              exact
              path="/verifyemailforgotpassword"
              name="Forgot Password Verify Email"
              element={<VerifyEmailForgotPassword />}
            />
            <Route exact path="/forgotpattern" name="Forgot Pattern " element={<ForgotPattern />} />
            <Route
              exact
              path="/twofaforgotpattern"
              name="TwofaForgotPattern  "
              element={<TwofaForgotPattern />}
            />
            <Route
              exact
              path="/twofaforgotpassword"
              name="TwofaForgotPassword"
              element={<TwofaForgotPassword />}
            />
            <Route
              exact
              path="/forgotpassword"
              name="Forgot Password"
              element={<ForgotPassword />}
            />
            <Route exact path="/changepattern" name="Change Pattern" element={<ChangePattern />} />
            <Route
              exact
              path="/changepatternmain"
              name="Change Pattern Main"
              element={<ChangePatternMain />}
            />

            <Route
              exact
              path="/changepassword"
              name="Change Password"
              element={<ChangePassword />}
            />
            <Route exact path="/newlogin" name="Login Page" element={<NewLogin />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
