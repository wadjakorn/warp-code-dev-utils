import React, { useState, useEffect } from 'react';
import './TimeDate.css';

type ActiveTool = 'unix' | 'timezone' | 'calculator' | 'iso';

const TimeDate: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('unix');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Unix Timestamp Converter states
  const [unixInput, setUnixInput] = useState('');
  const [unixResult, setUnixResult] = useState('');
  const [unixMode, setUnixMode] = useState<'toDate' | 'toTimestamp'>('toDate');
  const [dateInput, setDateInput] = useState('');

  // Timezone Converter states
  const [fromTimezone, setFromTimezone] = useState('UTC');
  const [toTimezone, setToTimezone] = useState('America/New_York');
  const [timezoneDate, setTimezoneDate] = useState('');
  const [timezoneTime, setTimezoneTime] = useState('');
  const [timezoneResult, setTimezoneResult] = useState('');
  const [timezoneInputType, setTimezoneInputType] = useState<'unix' | 'iso' | 'local'>('unix');

  // Date Calculator states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [calculatorResult, setCalculatorResult] = useState('');
  const [addSubtractDate, setAddSubtractDate] = useState('');
  const [operationType, setOperationType] = useState<'add' | 'subtract'>('add');
  const [timeUnit, setTimeUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('days');
  const [timeValue, setTimeValue] = useState('');
  const [addSubtractResult, setAddSubtractResult] = useState('');
  const [calculatorInputType, setCalculatorInputType] = useState<'unix' | 'iso' | 'local'>('unix');
  const [addSubtractInputType, setAddSubtractInputType] = useState<'unix' | 'iso' | 'local'>('unix');

  // ISO 8601 Formatter states
  const [isoInput, setIsoInput] = useState('');
  const [isoResult, setIsoResult] = useState('');
  const [isoMode, setIsoMode] = useState<'toISO' | 'fromISO'>('toISO');
  const [isoInputType, setIsoInputType] = useState<'unix' | 'iso' | 'local'>('unix');

  const commonTimezones = [
    // Universal
    'UTC',
    
    // North America
    'America/New_York',        // Eastern Time
    'America/Chicago',         // Central Time
    'America/Denver',          // Mountain Time
    'America/Los_Angeles',     // Pacific Time
    'America/Anchorage',       // Alaska Time
    'Pacific/Honolulu',        // Hawaii Time
    'America/Toronto',         // Eastern Time (Canada)
    'America/Vancouver',       // Pacific Time (Canada)
    'America/Mexico_City',     // Central Time (Mexico)
    
    // South America
    'America/Sao_Paulo',       // Brazil Time
    'America/Argentina/Buenos_Aires', // Argentina Time
    'America/Lima',            // Peru Time
    'America/Bogota',          // Colombia Time
    
    // Europe
    'Europe/London',           // GMT/BST
    'Europe/Paris',            // CET/CEST
    'Europe/Berlin',           // CET/CEST
    'Europe/Rome',             // CET/CEST
    'Europe/Madrid',           // CET/CEST
    'Europe/Amsterdam',        // CET/CEST
    'Europe/Vienna',           // CET/CEST
    'Europe/Stockholm',        // CET/CEST
    'Europe/Oslo',             // CET/CEST
    'Europe/Helsinki',         // EET/EEST
    'Europe/Warsaw',           // CET/CEST
    'Europe/Prague',           // CET/CEST
    'Europe/Budapest',         // CET/CEST
    'Europe/Zurich',           // CET/CEST
    'Europe/Brussels',         // CET/CEST
    'Europe/Copenhagen',       // CET/CEST
    'Europe/Dublin',           // GMT/IST
    'Europe/Moscow',           // MSK
    'Europe/Kiev',             // EET/EEST
    'Europe/Athens',           // EET/EEST
    'Europe/Istanbul',         // TRT
    
    // Asia
    'Asia/Tokyo',              // JST
    'Asia/Shanghai',           // CST
    'Asia/Hong_Kong',          // HKT
    'Asia/Singapore',          // SGT
    'Asia/Seoul',              // KST
    'Asia/Kolkata',            // IST
    'Asia/Mumbai',             // IST
    'Asia/Delhi',              // IST
    'Asia/Bangkok',            // ICT
    'Asia/Jakarta',            // WIB
    'Asia/Manila',             // PST
    'Asia/Kuala_Lumpur',       // MYT
    'Asia/Taipei',             // CST
    'Asia/Dubai',              // GST
    'Asia/Riyadh',             // AST
    'Asia/Tehran',             // IRST
    'Asia/Karachi',            // PKT
    'Asia/Dhaka',              // BST
    'Asia/Yangon',             // MMT
    'Asia/Almaty',             // ALMT
    'Asia/Tashkent',           // UZT
    'Asia/Yekaterinburg',      // YEKT
    'Asia/Novosibirsk',        // NOVT
    'Asia/Vladivostok',        // VLAT
    
    // Africa
    'Africa/Cairo',            // EET
    'Africa/Lagos',            // WAT
    'Africa/Johannesburg',     // SAST
    'Africa/Nairobi',          // EAT
    'Africa/Casablanca',       // WET
    'Africa/Algiers',          // CET
    'Africa/Tunis',            // CET
    'Africa/Addis_Ababa',      // EAT
    
    // Australia & Oceania
    'Australia/Sydney',        // AEDT/AEST
    'Australia/Melbourne',     // AEDT/AEST
    'Australia/Brisbane',      // AEST
    'Australia/Perth',         // AWST
    'Australia/Adelaide',      // ACDT/ACST
    'Australia/Darwin',        // ACST
    'Pacific/Auckland',        // NZDT/NZST
    'Pacific/Fiji',            // FJT
    'Pacific/Tahiti',          // TAHT
    'Pacific/Guam',            // ChST
    
    // Other
    'Atlantic/Reykjavik',      // GMT
    'Indian/Mauritius',        // MUT
    'Pacific/Midway',          // SST
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Universal date parsing function
  const parseDate = (input: string, inputType: 'unix' | 'iso' | 'local'): Date => {
    switch (inputType) {
      case 'unix':
        const timestamp = parseInt(input, 10);
        // Handle both seconds and milliseconds
        return new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
      case 'iso':
        return new Date(input);
      case 'local':
      default:
        return new Date(input);
    }
  };

  // Helper function to format date input placeholder
  const getDateInputPlaceholder = (inputType: 'unix' | 'iso' | 'local'): string => {
    switch (inputType) {
      case 'unix':
        return 'Unix timestamp (e.g., 1609459200)';
      case 'iso':
        return 'ISO 8601 (e.g., 2021-01-01T00:00:00Z)';
      case 'local':
      default:
        return 'Date/time (e.g., 2021-01-01 12:00:00)';
    }
  };

  // Unix Timestamp Converter functions
  const convertUnixTimestamp = () => {
    try {
      if (unixMode === 'toDate') {
        const timestamp = parseInt(unixInput, 10);
        const date = new Date(timestamp * 1000);
        setUnixResult(`Local: ${date.toLocaleString()}\nUTC: ${date.toUTCString()}\nISO: ${date.toISOString()}`);
      } else {
        const date = new Date(dateInput);
        const timestamp = Math.floor(date.getTime() / 1000);
        setUnixResult(`Unix Timestamp: ${timestamp}\nMilliseconds: ${date.getTime()}`);
      }
    } catch (error) {
      setUnixResult('Invalid input');
    }
  };

  const getCurrentTimestamp = () => {
    const now = Math.floor(Date.now() / 1000);
    setUnixInput(now.toString());
  };

  // Timezone Converter functions
  const convertTimezone = () => {
    try {
      let date: Date;
      
      if (timezoneInputType === 'local') {
        const inputDateTime = `${timezoneDate}T${timezoneTime}`;
        date = new Date(inputDateTime);
      } else {
        date = parseDate(timezoneDate, timezoneInputType);
      }
      
      const fromTime = new Intl.DateTimeFormat('en-US', {
        timeZone: fromTimezone,
        dateStyle: 'full',
        timeStyle: 'long'
      }).format(date);
      
      const toTime = new Intl.DateTimeFormat('en-US', {
        timeZone: toTimezone,
        dateStyle: 'full',
        timeStyle: 'long'
      }).format(date);
      
      setTimezoneResult(`From (${fromTimezone}): ${fromTime}\n\nTo (${toTimezone}): ${toTime}`);
    } catch (error) {
      setTimezoneResult('Invalid date/time input');
    }
  };

  const useCurrentTime = () => {
    const now = new Date();
    setTimezoneDate(now.toISOString().split('T')[0]);
    setTimezoneTime(now.toTimeString().substring(0, 8));
  };

  // Date Calculator functions
  const calculateDateDifference = () => {
    try {
      const date1 = parseDate(startDate, calculatorInputType);
      const date2 = parseDate(endDate, calculatorInputType);
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      const diffWeeks = Math.floor(diffDays / 7);
      const diffMonths = Math.floor(diffDays / 30.44); // Average days per month
      const diffYears = Math.floor(diffDays / 365.25); // Account for leap years
      
      setCalculatorResult(
        `Difference: ${diffDays} days, ${diffHours} hours, ${diffMinutes} minutes\n` +
        `In weeks: ${diffWeeks} weeks\n` +
        `In months: ${diffMonths} months\n` +
        `In years: ${diffYears} years`
      );
    } catch (error) {
      setCalculatorResult('Invalid date input');
    }
  };

  const addSubtractTime = () => {
    try {
      const date = parseDate(addSubtractDate, addSubtractInputType);
      const value = parseInt(timeValue, 10);
      
      let newDate = new Date(date);
      
      switch (timeUnit) {
        case 'days':
          newDate.setDate(date.getDate() + (operationType === 'add' ? value : -value));
          break;
        case 'weeks':
          newDate.setDate(date.getDate() + (operationType === 'add' ? value * 7 : -value * 7));
          break;
        case 'months':
          newDate.setMonth(date.getMonth() + (operationType === 'add' ? value : -value));
          break;
        case 'years':
          newDate.setFullYear(date.getFullYear() + (operationType === 'add' ? value : -value));
          break;
      }
      
      setAddSubtractResult(
        `Original: ${date.toLocaleDateString()}\n` +
        `Result: ${newDate.toLocaleDateString()}\n` +
        `ISO: ${newDate.toISOString()}`
      );
    } catch (error) {
      setAddSubtractResult('Invalid input');
    }
  };

  // ISO 8601 Formatter functions
  const formatISO = () => {
    try {
      if (isoMode === 'toISO') {
        const date = parseDate(isoInput, isoInputType);
        setIsoResult(
          `ISO 8601: ${date.toISOString()}\n` +
          `Local: ${date.toLocaleString()}\n` +
          `UTC: ${date.toUTCString()}`
        );
      } else {
        const date = new Date(isoInput);
        setIsoResult(
          `Local Date: ${date.toLocaleDateString()}\n` +
          `Local Time: ${date.toLocaleTimeString()}\n` +
          `Full Local: ${date.toLocaleString()}`
        );
      }
    } catch (error) {
      setIsoResult('Invalid input format');
    }
  };

  const useCurrentISO = () => {
    setIsoInput(currentTime.toISOString());
  };

  const clearAll = () => {
    switch (activeTool) {
      case 'unix':
        setUnixInput('');
        setUnixResult('');
        setDateInput('');
        break;
      case 'timezone':
        setTimezoneDate('');
        setTimezoneTime('');
        setTimezoneResult('');
        setTimezoneInputType('unix');
        break;
      case 'calculator':
        setStartDate('');
        setEndDate('');
        setCalculatorResult('');
        setAddSubtractDate('');
        setTimeValue('');
        setAddSubtractResult('');
        setCalculatorInputType('unix');
        setAddSubtractInputType('unix');
        break;
      case 'iso':
        setIsoInput('');
        setIsoResult('');
        setIsoInputType('unix');
        break;
    }
  };

  const renderUnixConverter = () => (
    <div className="tool-section">
      <div className="mode-selector">
        <label>
          <input
            type="radio"
            checked={unixMode === 'toDate'}
            onChange={() => setUnixMode('toDate')}
          />
          Timestamp to Date
        </label>
        <label>
          <input
            type="radio"
            checked={unixMode === 'toTimestamp'}
            onChange={() => setUnixMode('toTimestamp')}
          />
          Date to Timestamp
        </label>
      </div>
      
      {unixMode === 'toDate' ? (
        <div className="input-group">
          <label>Unix Timestamp:</label>
          <div className="input-with-button">
            <input
              type="number"
              value={unixInput}
              onChange={(e) => setUnixInput(e.target.value)}
              placeholder="1609459200"
            />
            <button onClick={getCurrentTimestamp} className="helper-btn">
              Use Current
            </button>
          </div>
        </div>
      ) : (
        <div className="input-group">
          <label>Date/Time:</label>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
        </div>
      )}
      
      <button onClick={convertUnixTimestamp} className="convert-btn">
        Convert
      </button>
      
      {unixResult && (
        <div className="result-display">
          <h4>Result:</h4>
          <pre>{unixResult}</pre>
        </div>
      )}
    </div>
  );

  const renderTimezoneConverter = () => (
    <div className="tool-section">
      <div className="input-type-selector">
        <label>Input Type:</label>
        <select value={timezoneInputType} onChange={(e) => setTimezoneInputType(e.target.value as 'unix' | 'iso' | 'local')}>
          <option value="unix">Unix Timestamp</option>
          <option value="iso">ISO 8601</option>
          <option value="local">Local Date/Time</option>
        </select>
      </div>
      
      {timezoneInputType === 'local' ? (
        <div className="timezone-inputs">
          <div className="input-group">
            <label>Date:</label>
            <input
              type="date"
              value={timezoneDate}
              onChange={(e) => setTimezoneDate(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>Time:</label>
            <div className="input-with-button">
              <input
                type="time"
                value={timezoneTime}
                onChange={(e) => setTimezoneTime(e.target.value)}
              />
              <button onClick={useCurrentTime} className="helper-btn">
                Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="input-group">
          <label>{timezoneInputType === 'unix' ? 'Unix Timestamp:' : 'ISO 8601 Date:'}</label>
          <input
            type="text"
            value={timezoneDate}
            onChange={(e) => setTimezoneDate(e.target.value)}
            placeholder={getDateInputPlaceholder(timezoneInputType)}
          />
        </div>
      )}
      
      <div className="timezone-selectors">
        <div className="input-group">
          <label>From Timezone:</label>
          <select value={fromTimezone} onChange={(e) => setFromTimezone(e.target.value)}>
            {commonTimezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
        
        <div className="input-group">
          <label>To Timezone:</label>
          <select value={toTimezone} onChange={(e) => setToTimezone(e.target.value)}>
            {commonTimezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>
      
      <button onClick={convertTimezone} className="convert-btn">
        Convert Timezone
      </button>
      
      {timezoneResult && (
        <div className="result-display">
          <h4>Result:</h4>
          <pre>{timezoneResult}</pre>
        </div>
      )}
    </div>
  );

  const renderDateCalculator = () => (
    <div className="tool-section">
      <div className="calculator-section">
        <h4>Date Difference Calculator</h4>
        <div className="input-type-selector">
          <label>Input Type:</label>
          <select value={calculatorInputType} onChange={(e) => setCalculatorInputType(e.target.value as 'unix' | 'iso' | 'local')}>
            <option value="unix">Unix Timestamp</option>
            <option value="iso">ISO 8601</option>
            <option value="local">Local Date</option>
          </select>
        </div>
        <div className="date-inputs">
          <div className="input-group">
            <label>Start Date:</label>
            <input
              type={calculatorInputType === 'local' ? 'date' : 'text'}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder={calculatorInputType === 'local' ? '' : getDateInputPlaceholder(calculatorInputType)}
            />
          </div>
          
          <div className="input-group">
            <label>End Date:</label>
            <input
              type={calculatorInputType === 'local' ? 'date' : 'text'}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder={calculatorInputType === 'local' ? '' : getDateInputPlaceholder(calculatorInputType)}
            />
          </div>
        </div>
        
        <button onClick={calculateDateDifference} className="convert-btn">
          Calculate Difference
        </button>
        
        {calculatorResult && (
          <div className="result-display">
            <h4>Difference:</h4>
            <pre>{calculatorResult}</pre>
          </div>
        )}
      </div>
      
      <div className="calculator-section">
        <h4>Add/Subtract Time</h4>
        <div className="input-type-selector">
          <label>Input Type:</label>
          <select value={addSubtractInputType} onChange={(e) => setAddSubtractInputType(e.target.value as 'unix' | 'iso' | 'local')}>
            <option value="unix">Unix Timestamp</option>
            <option value="iso">ISO 8601</option>
            <option value="local">Local Date</option>
          </select>
        </div>
        <div className="add-subtract-inputs">
          <div className="input-group">
            <label>Base Date:</label>
            <input
              type={addSubtractInputType === 'local' ? 'date' : 'text'}
              value={addSubtractDate}
              onChange={(e) => setAddSubtractDate(e.target.value)}
              placeholder={addSubtractInputType === 'local' ? '' : getDateInputPlaceholder(addSubtractInputType)}
            />
          </div>
          
          <div className="operation-controls">
            <div className="input-group">
              <label>Operation:</label>
              <select
                value={operationType}
                onChange={(e) => setOperationType(e.target.value as 'add' | 'subtract')}
              >
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
              </select>
            </div>
            
            <div className="input-group">
              <label>Value:</label>
              <input
                type="number"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                placeholder="1"
              />
            </div>
            
            <div className="input-group">
              <label>Unit:</label>
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value as 'days' | 'weeks' | 'months' | 'years')}
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
        </div>
        
        <button onClick={addSubtractTime} className="convert-btn">
          Calculate
        </button>
        
        {addSubtractResult && (
          <div className="result-display">
            <h4>Result:</h4>
            <pre>{addSubtractResult}</pre>
          </div>
        )}
      </div>
    </div>
  );

  const renderISOFormatter = () => (
    <div className="tool-section">
      <div className="mode-selector">
        <label>
          <input
            type="radio"
            checked={isoMode === 'toISO'}
            onChange={() => setIsoMode('toISO')}
          />
          To ISO 8601
        </label>
        <label>
          <input
            type="radio"
            checked={isoMode === 'fromISO'}
            onChange={() => setIsoMode('fromISO')}
          />
          From ISO 8601
        </label>
      </div>
      
      {isoMode === 'toISO' && (
        <div className="input-type-selector">
          <label>Input Type:</label>
          <select value={isoInputType} onChange={(e) => setIsoInputType(e.target.value as 'unix' | 'iso' | 'local')}>
            <option value="unix">Unix Timestamp</option>
            <option value="iso">ISO 8601</option>
            <option value="local">Local Date/Time</option>
          </select>
        </div>
      )}
      
      <div className="input-group">
        <label>
          {isoMode === 'toISO' ? 
            (isoInputType === 'unix' ? 'Unix Timestamp:' : 
             isoInputType === 'iso' ? 'ISO 8601 String:' : 'Date/Time:') : 
            'ISO 8601 String:'}
        </label>
        <div className="input-with-button">
          <input
            type={isoMode === 'toISO' && isoInputType === 'local' ? 'datetime-local' : 'text'}
            value={isoInput}
            onChange={(e) => setIsoInput(e.target.value)}
            placeholder={isoMode === 'toISO' ? 
              (isoInputType === 'local' ? '' : getDateInputPlaceholder(isoInputType)) : 
              '2021-01-01T00:00:00.000Z'}
          />
          <button onClick={useCurrentISO} className="helper-btn">
            Use Current
          </button>
        </div>
      </div>
      
      <button onClick={formatISO} className="convert-btn">
        Format
      </button>
      
      {isoResult && (
        <div className="result-display">
          <h4>Result:</h4>
          <pre>{isoResult}</pre>
        </div>
      )}
    </div>
  );

  return (
    <div className="timedate-container">
      <div className="timedate-header">
        <h2>Time & Date Utilities</h2>
        <div className="current-time">
          <strong>Current Time:</strong> {currentTime.toLocaleString()}
        </div>
      </div>
      
      <div className="tool-navigation">
        <button
          className={`tool-btn ${activeTool === 'unix' ? 'active' : ''}`}
          onClick={() => setActiveTool('unix')}
        >
          Unix Timestamp
        </button>
        <button
          className={`tool-btn ${activeTool === 'timezone' ? 'active' : ''}`}
          onClick={() => setActiveTool('timezone')}
        >
          Timezone Converter
        </button>
        <button
          className={`tool-btn ${activeTool === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTool('calculator')}
        >
          Date Calculator
        </button>
        <button
          className={`tool-btn ${activeTool === 'iso' ? 'active' : ''}`}
          onClick={() => setActiveTool('iso')}
        >
          ISO 8601 Formatter
        </button>
      </div>
      
      <div className="tool-content">
        <div className="tool-controls">
          <button onClick={clearAll} className="clear-btn">
            Clear All
          </button>
        </div>
        
        {activeTool === 'unix' && renderUnixConverter()}
        {activeTool === 'timezone' && renderTimezoneConverter()}
        {activeTool === 'calculator' && renderDateCalculator()}
        {activeTool === 'iso' && renderISOFormatter()}
      </div>
    </div>
  );
};

export default TimeDate;

