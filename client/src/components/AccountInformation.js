import React from "react";
import {
  FormErrorMessage,
  Input,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import PropTypes from "prop-types";

export const AccountInformation = ({ accountInfo }) => {
  return (
    <Formik
      initialValues={{ name: "Sasuke" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name="name" validate={true}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input {...field} id="name" placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button mt={4} colorScheme="teal" isLoading={false} type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

AccountInformation.propTypes = {
  accountInfo: PropTypes.object.isRequired,
};
