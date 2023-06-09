import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {

    const [, setDisabled] = useState(true);

    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
 
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    }, [])

    const handleLogin = event =>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result =>{
          const user = result.user;
          console.log(user);
          Swal.fire({
            title: 'User Login Successfully.',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
          navigate(from, { replace: true });

        })
    }

    const handleValidateCaptcha = (e) =>{
            const user_captcha_value = e.target.value;
            if (validateCaptcha(user_captcha_value)) {
                setDisabled(false)
            }
            // console.log(user_captcha_value)
    }
    return (
      <>
        <Helmet>
                <title>ZaRa Restaurant | Login</title>
            </Helmet>
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:w-1/2 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img className='w-96 h-auto' src="https://i.ibb.co/6bv0WZX/zara-Login.jpg" alt="" />
          </div>
          <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-3xl font-bold text-center mt-10">Login</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                <LoadCanvasTemplate />
                </label>
                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type above the captcha above" className="input input-bordered" required />
              
              </div>
              {/* TODO: make button disabled for captcha */}
              <div className="form-control mt-6">
                <input disabled={false} className="btn btn-primary" type="submit" value="login" />
              </div>
            </form>
            <p className='text-center mb-10'> <small>New here ?<Link to="/signup" className="text-yellow-500 font-bold"> create a New Account</Link> </small> </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
      </>
    );
};

export default Login;