import React, { Component } from 'react';

export default class References extends Component {
  render() {
    const referenceList = this.props.references.map((ref, idx) => {
      return (
        <li key={idx}>
          <a href={ref}>{ref}</a>
        </li>
      );
    });

    return (
      <div className="card-header references">
        <button
          className="btn btn-link"
          type="button"
          data-toggle="collapse"
          data-target="#references"
          aria-expanded="true"
          aria-controls="references"
        >
          References
        </button>
        <div className="collapse" id="references">
          <div className="card card-body">
            <ol>{referenceList}</ol>
          </div>
        </div>
      </div>
    );
  }
}
