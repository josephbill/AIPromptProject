import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../utils/LoadingSpinner'
import LoadingSpinner from '../utils/LoadingSpinner';

const initialValues = {
  name: '',
  investmentlevel: '',
  monthlyincome: '',
  interestcategory: '',
  countoforigin: '',
  investmentscope: '',
  risktolerance: '',
};

const profileSchema = Yup.object().shape({
  name: Yup.string().required('Identity is Required'),
  investmentlevel: Yup.string().required('Select an Investment Level'),
  monthlyincome: Yup.string().required('Select an Income Range'),
  interestcategory: Yup.string().required('Select an Interest Category'),
  countoforigin: Yup.string().required('What is your country of origin?'),
  investmentscope: Yup.string().required('Select an Investment Scope'),
  risktolerance: Yup.string().required('Select a Risk tolerance Scope'),
});

const ProfileUpdate = () => {

    //my states 
    const [adviceList, setAdviceList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [email,setEmail]  = useState("");


    // open ai prompt for suggestions 
    function createOpenApiPrompt(values){
        console.log(values.name)
        setIsLoading(true);
        setEmail(values.name);
        // construct sentence prompt using open ai 
        const prompt = "I am a " + values.investmentlevel + " investor with a monthly income of $" + values.monthlyincome 
        + " with an interest to invest in the " + values.interestcategory + " sector, my scope idealy is " + values.investmentscope 
        + " i have a " + values.risktolerance +  " tolerance level, " + " what can you advice first and then using my country of origin " + values.countoforigin + " and selected area scope indicated as " 
        + values.investmentscope + " can you point me to some institutions that can aid in the process " ; 
        console.log(prompt)
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer <yourApikey>',
            },
            body: JSON.stringify({
              model: 'text-davinci-003',
              prompt: prompt,
              max_tokens: 1000,
              temperature: 0,
            })
          };
          
          fetch('https://api.openai.com/v1/completions', requestOptions)
            .then(response => response.json())
            .then(data => {
                setAdviceList(data.choices)
                setIsLoading(false);
            })
            .catch(error => console.log('Error:', error));
    }



    function budpayPrompt(email,amount,currency){
         //launch budpay
         const uniqueRef = new Date().valueOf()
        console.log(uniqueRef)
        let reference = "123456890123mn4mm5ckpskt0dsjlwk4" + uniqueRef
      const myObject = {
            "email": email.toString(),
            "amount": amount.toString(),
            "currency": currency.toString(),
            "reference": reference.toString(),
            "callback":"https://lucent-moxie-7b30b4.netlify.app/" 
        }

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer sk_live_cswltnqwc2rp7dedhblxpxmuoaz880jgqmi92dz'
            },
            body: JSON.stringify(myObject)
          };
          
          fetch('https://api.budpay.com/api/v2/transaction/initialize', requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.replace(data.data.authorization_url);
                console.log(data.data.authorization_url)
            })
            .catch(error => console.log('Error:', error));

        
    }



      


  return (

    <div className='container'>
    <blockquote>Discover your investment options with ease</blockquote>

    <Formik
      initialValues={initialValues}
      validationSchema={profileSchema}
      onSubmit={(values) => {
        //run action here -> to upload profile  // then redirect user to prompt page
         createOpenApiPrompt(values)
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container" style={{
            marginTop : 5 ,
            marginBottom : 5
          }}>
            {/* <h4>Update Profile to continue</h4> */}
            <Form>
            <div className="form-group" style={{
            marginBottom : 10
          }}>
                <label htmlFor="name" style={{
                    fontWeight : "bold"

                }}>Email</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className={`form-control ${
                    errors.name && touched.name ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

               <div className="form-group" style={{
            marginBottom : 10
          }}>
                <label htmlFor="investmentlevel" style={{
                    fontWeight : "bold"

                }}>Investment Level</label>
                <Field
                  as="select"
                  name="investmentlevel"
                  className={`form-control ${
                    errors.investmentlevel && touched.investmentlevel
                      ? 'is-invalid'
                      : ''
                  }`}
                >
                  <option value="">Select an Investment Level</option>
                  <option value="newbie">Newbie</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advance">Advance</option>
                </Field>
                <ErrorMessage
                  name="investmentlevel"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            

              <div className="form-group" style={{
            marginBottom : 10
          }}>
                <label htmlFor="monthlyincome" style={{
                    fontWeight : "bold"

                }}>Monthly Income</label>
                <Field
                  as="select"
                  name="monthlyincome"
                  className={`form-control ${
                    errors.monthlyincome && touched.monthlyincome
                      ? 'is-invalid': ''}`}>
<option value="">Select an Income Range</option>
<option value="less than 1000">Less than $1000</option>
<option value="1000-5000">$1000 - $5000</option>
<option value="5000-10000">$5000 - $10,000</option>
<option value="more than 10000">More than $10,000</option>
</Field>
<ErrorMessage
               name="monthlyincome"
               component="div"
               className="invalid-feedback"
             />
</div>

<div className="form-group" style={{
            marginBottom : 10
          }}>            <label htmlFor="interestcategory"style={{
            fontWeight : "bold"

        }}>Interest Category</label>
            <Field
              as="select"
              name="interestcategory"
              className={`form-control ${
                errors.interestcategory && touched.interestcategory
                  ? 'is-invalid'
                  : ''
              }`}
            >
              <option value="">Select an Interest Category</option>
              <option value="Agriculture">Agriculture</option>
              <option value="SME's">SME's</option>
              <option value="stocks">Stocks</option>
              <option value="bonds">Bonds</option>
              <option value="mutual funds">Mutual Funds</option>
              <option value="real estate">Real Estate</option>
            </Field>
            <ErrorMessage
              name="interestcategory"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group" style={{
            marginBottom : 10
          }}>
            <label htmlFor="countoforigin" style={{
                    fontWeight : "bold"

                }}>Country of Origin</label>
            <Field
              type="text"
              name="countoforigin"
              id="countoforigin"
              className={`form-control ${
                errors.countoforigin && touched.countoforigin
                  ? 'is-invalid'
                  : ''
              }`}
            />
            <ErrorMessage
              name="countoforigin"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group" style={{
            marginBottom : 10
          }}>
            <label htmlFor="investmentscope"style={{
                    fontWeight : "bold"

                }}>Investment Scope</label>
            <Field
              as="select"
              name="investmentscope"
              className={`form-control ${
                errors.investmentscope && touched.investmentscope
                  ? 'is-invalid'
                  : ''
              }`}
            >
              <option value="">Select an Investment Scope</option>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
              <option value="global">Global</option>
            </Field>
            <ErrorMessage
              name="investmentscope"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group" style={{
            marginBottom : 10
          }}>
            <label htmlFor="risktolerance"style={{
                    fontWeight : "bold"

                }}>Risk Tolerance</label>
            <Field
              as="select"
              name="risktolerance"
              className={`form-control ${
                errors.risktolerance && touched.risktolerance
                  ? 'is-invalid'
                  : ''
              }`}
            >
              <option value="">Select a Risk Tolerance</option>
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </Field>
            <ErrorMessage
              name="risktolerance"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid || !dirty}
            style={{
                marginBottom : 7,
                marginRight :7
            }}
          >
            Submit
          </button>

          <button
            type="reset"
            className="btn btn-danger"
            disabled={!isValid || !dirty}
            style={{
                marginBottom : 7,
            }}
          >
            Reset Form
          </button>

          {/* donate  */}
          {adviceList.length > 0 && (
              <div>
                 <button
                     className="btn btn-success"
                     onClick={() => {
                     if (window.confirm('Do you want to proceed with the donation to help us improve our AI model? Your donation will be used to raise a team of experts who will train our AI model to provide more detailed and accurate advice. Your support will help us create a better user experience and provide valuable insights to our users. Click OK to proceed or Cancel to abort.')) {
                     // User clicked OK
                    // Call the API here
                    let amount = 5
                    let currency = "KES"
                     budpayPrompt(email,amount,currency);
                        
                       } else {
                    // User clicked Cancel
                    // Do nothing or show a message
              }
          }}
   >
  Donate : Get the why here?
</button>
              </div>
          ) }
        </Form>
        {/* advice */}
        {isLoading ? <LoadingSpinner /> : <div className='container'>
            
        {adviceList.length > 0 && (
            <div className="container alert alert-info" style={{
                marginTop : 10,
                marginBottom  : 10
            }}>
                        <h6> Robo Adviser Suggestion </h6>
              {adviceList.map(advice => (
                // <li key={advice.id}>{advice.text}</li>
                   <blockquote>{advice.text}</blockquote>
              ))}
            </div>
          )}

            </div>
        
        }
   
      </div>
    );
  }}
</Formik>
</div>
);
};


export default ProfileUpdate