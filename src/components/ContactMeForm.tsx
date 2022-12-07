import classNames from "classnames";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { ModalContext } from "../context/ModalContext";

const ContactMeForm = () => {
  const modalContext = useContext(ModalContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      content: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Min. lenght of title is 3 characters")
        .max(64, "Max lenght of title id 64 characters")
        .required("This filed is required"),
      email: Yup.string()
        .email("Email is not valid")
        .required("This filed is required"),
      content: Yup.string()
        .min(3, "Min. lenght of message is 3 characters")
        .max(250, "Max lenght of message id 250 characters")
        .required("This filed is required"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ content, email, name }) => {
      const result = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ content, email, name }),
      });

      if (result.ok) {
        formik.resetForm();
        modalContext?.setupModal("Succes", "I will anwser soon.", true, []);
      } else
        modalContext?.setupModal(
          "Somenthig went wrong",
          "Try it later",
          true,
          []
        );

      modalContext?.show();
      formik.setSubmitting(false);
    },
  });

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 grid-rows-[1fr_1fr_300px] md:grid-rows-[min-content_300px] gap-3 mt-5"
      onChange={(e) => {
        formik.setErrors({});
        formik.handleChange(e);
      }}
      onSubmit={(e) => {
        formik.handleSubmit(e);
      }}
    >
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name or your company"
          className={classNames("input input-bordered w-full", {
            "input-error": formik.errors.name,
          })}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <label className="label">
          <span className="label-text-alt text-error">
            {formik.errors.name}
          </span>
        </label>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Your email</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@example.com"
          className={classNames("input input-bordered w-full", {
            "input-error": formik.errors.email,
          })}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <label className="label">
          <span className="label-text-alt text-error">
            {formik.errors.email}
          </span>
        </label>
      </div>
      <div className="form-control md:col-span-2 w-full h-full">
        <label className="label">
          <span className="label-text">Your message</span>
        </label>
        <textarea
          id="content"
          className={classNames("textarea textarea-bordered grow", {
            "textarea-error": formik.errors.content,
          })}
          placeholder="Type your message here ..."
          value={formik.values.content}
          onChange={formik.handleChange}
        ></textarea>
        <label className="label">
          <span className="label-text-alt text-error">
            {formik.errors.content}
          </span>
          <span className="label-text-alt">
            {formik.values.content.length}/250
          </span>
        </label>
      </div>
      <button
        className={classNames("btn btn-primary md:w-64", {
          loading: formik.isSubmitting,
        })}
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default ContactMeForm;
