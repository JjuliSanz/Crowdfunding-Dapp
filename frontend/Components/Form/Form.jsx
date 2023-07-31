import React from "react";
import { FormSVG, Lock, Cross } from "../SVG/index";
import Style from "./Form.module.css";
import { CheckBox } from "../index";

const Form = ({
  setFile,
  setDisplay,
  handleFormFieldChange,
  handleSubmit,
  setCategory,
  setCloseForm
}) => {
  const categories = ["Nature", "Artifical", "Animal"];

  return (
    <div className={Style.card}>
      <div className={Style.card2}>
        <form className={Style.form}>
          <p id="heading" className={Style.heading}>
            Upload Image Details
          </p>
          {/* FIELD 1 */}
          <div className={Style.field}>
            <FormSVG styleClass={Style.input_icon} />
            <input
              type="text"
              className={Style.input_field}
              placeholder="title"
              autoComplete="off"
              onChange={(e) => handleFormFieldChange("title", e)}
            />
          </div>

          {/* FIELD 2 */}
          <div className={Style.field}>
            <Lock styleClass={Style.input_icon} />
            <textarea
              type="description"
              className={`${Style.textarea} ${Style.input_field}`}
              placeholder="description"
              onChange={(e) => handleFormFieldChange("description", e)}
            ></textarea>
          </div>

          {/* FIELD 3 */}
          <div className={Style.field}>
            <FormSVG styleClass={Style.input_icon} />
            <input
              type="email"
              className={Style.input_field}
              placeholder="email"
              onChange={(e) => handleFormFieldChange("email", e)}
            />
          </div>

          {/* CATEGORY */}
          <p className={Style.second}>Category</p>
          <div className={Style.category}>
            {categories.map((category, i) => (
              <CheckBox
                setCategory={setCategory}
                key={i + 1}
                category={category}
              />
            ))}
          </div>

          {/* BUTTONS */}
          <div className={Style.btn}>
            <button
              className={Style.button1}
              onClick={() => (setFile(null), setDisplay(null))}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            <button className={Style.button2}>Sign Up</button>
          </div>

          <button onClick={(e) => handleSubmit(e)} className={Style.button3}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
