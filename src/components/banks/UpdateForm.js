import React, { Component } from 'react';

export default class UpdateForm extends Component {

    constructor(){
        super();
        this.state = {
            bankname: this.props.bankdata.bankname,
            bankcode: this.props.bankdata.bankcode,
            otherinfo: this.props.bankdata.otherinfo
        }
    }

    onChange(e){
        this.setState({ [e.target.name] : e.target.value })
      }


  render() {

    return (
      <div>
        <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control form-control-md" 
                        placeholder="Bank name" 
                        name="bankname" 
                        value={this.state.bankname}
                        onChange={this.onChange}
                    />
                    </div>
                    <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control form-control-md" 
                        placeholder="Bank code" 
                        name="bankcode" 
                        value={this.state.bankcode}
                        onChange={this.onChange}
                    />
                    </div>

                    <div className="form-group">
                        <textarea 
                          name="otherinfo"
                          placeholder="Other Information"
                          className="form-control form-control-md"
                          value={this.state.otherinfo}
                          onChange={this.onChange}
                        ></textarea>
                    </div>
                    
                    <input 
                        type="submit" 
                        className="btn btn-info btn-block mt-4" 
                        value="Add Bank" 
                    />
                </form>
      </div>
    );
  }
}
