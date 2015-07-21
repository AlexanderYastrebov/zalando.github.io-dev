import React from 'react';

export default class BarChart extends React.Component {

  constructor(props) {
    super(props);
  }

  generateKey(prefix, label, i) {
    return prefix + '_' + label + '_' + i;
  }

  render() {

    let rows = this.props.data.map(function (item, i) {

      let label = item.label;
      let percentage = item.percentage;
      let labelKey = this.generateKey('bar-chart-label', label, i);
      let barKey = this.generateKey('bar-chart-bar', label, i);
      let rowKey = this.generateKey('bar-chart-row', label, i);
      let labelColKey = this.generateKey('bar-chart-label-col', label, i);
      let barColKey = this.generateKey('bar-chart-bar-col', label, i);

      let barStyle = {
        width: item.width + '%',
        background: item.color
      };

      return (
        <div key={rowKey} className="bar-chart-row">
          <div key={labelColKey} className="bar-chart-label-col">
            <div key={labelKey} className="bar-chart-label"><span>{label}</span></div>
          </div>
          <div key={barColKey} className="bar-chart-bar-col">
            <div key={barKey} className="bar-chart-bar" style={barStyle}>
              <span className="bar-chart-bar-percentage">{percentage} %</span>
            </div>
          </div>
        </div>
      );
    }.bind(this));

    return (
      <div className="bar-chart">
        {rows}
      </div>
    );
  }
}
