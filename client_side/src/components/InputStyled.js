import React, { PropTypes, Component } from 'react';
const { string, func } = PropTypes;

const propTypes= {
  name: string.isRequired,
  label: string.isRequired,
  onChange: func.isRequired,
  placeholder: string,
  value: string,
  error: string,
};

class InputStyled extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    let wrapperClass = 'form-group';
    if(this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }
    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <input type="text"
                 name={this.props.name}
                 className="form-control"
                 placeholder={this.props.placeholder}
                 ref={this.props.name}
                 onChange={this.props.onChange}
                 value={this.props.value}
          />
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
}

InputStyled.propTypes = propTypes;
export default InputStyled;
