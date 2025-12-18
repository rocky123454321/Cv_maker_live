import React from "react";
import PropTypes from "prop-types";

export default function Form({ formData, handleChange }) {
  return (
    <div className="flex">
      <div className="w-1/3 p-4 space-y-2 border-r overflow-y-auto h-screen">
        <h2 className="font-bold text-lg mb-4">Harvard CV Generator</h2>
       
      </div>
    </div>
  );
}

Form.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
