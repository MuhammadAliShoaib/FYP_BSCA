import { useAccount } from "wagmi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  role: Yup.string().required("Please select a role"),
});

const Signup = () => {
  const { address } = useAccount();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    address: address,
    role: "",
  };

  const onSubmit = async (values: any) => {
    try {
      console.log('hello')
      const response = await Axios.post("/api/signup/actor", {
        name: values.name,
        address: values.address,
        role: values.role,
      });

      const data = await response.data;
      console.log(data);
      navigate(`/${values.role}`)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div>
          <label htmlFor="name">Name:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <label htmlFor="role">Role:</label>
          <Field as="select" id="role" name="role">
            <option value="" label="Select a role" />
            <option value="manufacturer" label="Manufacturer" />
            <option value="distributor" label="Distributor" />
            <option value="pharmacy" label="Pharmacy" />
          </Field>
          <ErrorMessage name="role" component="div" />
        </div>

        <button type="submit">Submit</button>
        <p>{address}</p>
        
      </Form>
    </Formik>
  );
};

export default Signup;
