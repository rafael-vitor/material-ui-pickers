import * as React from 'react';
import DateTimePickerRoot, { BaseDateTimePickerProps } from './DateTimePickerRoot';
import { useUtils } from '../_shared/hooks/useUtils';
import { BasePickerProps } from '../typings/BasePicker';
import { toShowDateTimePickerTabs } from '../_helpers/utils';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { dateTimePickerDefaultProps } from '../constants/prop-types';
import { PureDateInput, PureDateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps, getError, pick12hOr24hFormat } from '../_helpers/text-field-helper';

export type DateTimePickerProps = BasePickerProps &
  DateValidationProps &
  BaseDateTimePickerProps &
  ExtendWrapper<PureDateInputProps>;

export const DateTimePicker: React.FC<DateTimePickerProps> = props => {
  const {
    allowKeyboardControl,
    ampm,
    animateYearScrolling,
    autoOk,
    autoSubmit,
    dateRangeIcon,
    disableFuture,
    disablePast,
    format,
    forwardedRef,
    initialFocusedDate,
    invalidDateMessage,
    labelFunc,
    leftArrowIcon,
    maxDate,
    maxDateMessage,
    minDate,
    minDateMessage,
    minutesStep,
    onAccept,
    onChange,
    onOpen,
    onClose,
    onMonthChange,
    onYearChange,
    openTo,
    renderDay,
    rightArrowIcon,
    shouldDisableDate,
    showTabs,
    timeIcon,
    value,
    variant,
    ...other
  } = props;

  const utils = useUtils();
  const toShowTabs = toShowDateTimePickerTabs(showTabs);
  const { pickerProps, inputProps, wrapperProps } = usePickerState(props, {
    getValidationError: () => getError(value, utils, props),
    getDefaultFormat: () =>
      pick12hOr24hFormat(format, ampm, {
        '12h': utils.dateTime12hFormat,
        '24h': utils.dateTime24hFormat,
      }),
  });

  return (
    <Wrapper
      variant={variant}
      InputComponent={PureDateInput}
      DateInputProps={inputProps}
      {...wrapperProps}
      {...other}
    >
      <DateTimePickerRoot
        {...pickerProps}
        allowKeyboardControl={allowKeyboardControl}
        ampm={ampm}
        minutesStep={minutesStep}
        animateYearScrolling={animateYearScrolling}
        autoSubmit={autoSubmit}
        dateRangeIcon={dateRangeIcon}
        disableFuture={disableFuture}
        disablePast={disablePast}
        leftArrowIcon={leftArrowIcon}
        maxDate={maxDate}
        minDate={minDate}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
        openTo={openTo}
        renderDay={renderDay}
        rightArrowIcon={rightArrowIcon}
        shouldDisableDate={shouldDisableDate}
        showTabs={toShowTabs}
        timeIcon={timeIcon}
      />
    </Wrapper>
  );
};

DateTimePicker.defaultProps = dateTimePickerDefaultProps;

export default React.forwardRef((props: DateTimePickerProps, ref) => (
  <DateTimePicker {...props} forwardedRef={ref} />
));
