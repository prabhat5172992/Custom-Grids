import React from "react";
import Toastr from "./toaster";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

export default class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      name: [],
    };
  }

  getAllCountries() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((data) => {
        try {
          //console.log(data);
          const name = data.map((item, index) => ({
            label: item.name,
            value: index + 1,
          }));
          console.log("Name", name);
          this.setState({ countries: data, name });
        } catch (err) {
          console.log(err);
        }
      });
  }

  render() {
    const { countries } = this.state;
    console.log("Data===", countries);
    return (
      <React.Fragment>
        {countries ? (
          <Toastr
            status="SUCCESS"
            message="Succfully called API!!"
            timeout={3000}
          />
        ) : (
          <Toastr
            status="ERROR"
            message="Error incalling API!!"
            timeout={3000}
          />
        )}
        <h3>Countries</h3>
        <input
          type="button"
          value="Submit"
          onClick={() => this.getAllCountries()}
        />
        <br />
        <ReactMultiSelectCheckboxes options={this.state.name} />
        <br />
        <select id="cars">
          <option value="countries">All Countries</option>
          {countries.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  }
}
