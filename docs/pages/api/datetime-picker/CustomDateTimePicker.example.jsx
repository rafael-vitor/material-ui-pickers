import SnoozeIcon from '@material-ui/icons/Snooze';
import AlarmIcon from '@material-ui/icons/AddAlarm';
import React, { PureComponent, Fragment } from 'react';
import { IconButton, InputAdornment } from '@material-ui/core';
import { DateTimePicker, KeyboardDatePicker } from 'material-ui-pickers';

class CustomDateTimePicker extends PureComponent {
  state = {
    selectedDate: new Date('2019-01-01T18:54'),
    clearedDate: null,
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleClearedDateChange = date => {
    this.setState({ clearedDate: date });
  };

  render() {
    const { selectedDate, clearedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <DateTimePicker
            autoOk
            ampm={false}
            showTabs={false}
            autoSubmit={false}
            allowKeyboardControl={false}
            disableFuture
            minDate={new Date('2018-01-01')}
            value={selectedDate}
            onChange={this.handleDateChange}
            helperText="Hardcoded helper text"
            leftArrowIcon={<AlarmIcon />}
            rightArrowIcon={<SnoozeIcon />}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <AlarmIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="picker">
          <KeyboardDatePicker
            label="Keyboard with error handler"
            onError={console.log}
            minDate={new Date('2018-01-01T00:00')}
            value={selectedDate}
            onChange={this.handleDateChange}
            format={this.props.getFormatString({
              moment: 'YYYY/MM/DD hh:mm A',
              dateFns: 'yyyy/MM/dd hh:mm a',
            })}
          />
        </div>

        <div className="picker">
          <DateTimePicker
            value={clearedDate}
            onChange={this.handleClearedDateChange}
            helperText="Clear Initial State"
            clearable
          />
        </div>
      </Fragment>
    );
  }
}

export default CustomDateTimePicker;
