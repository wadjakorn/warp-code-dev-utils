import React, { useState } from 'react';
import './TextUtilities.css';
import TimeDate from './TimeDate';

type UtilityType = 'base64' | 'url' | 'html' | 'uri' | 'hex' | 'binary' | 'json' | 'yaml' | 'csv' | 'querystring';
type OperationType = 'encode' | 'decode' | 'parse' | 'unparse';
type ActiveTab = 'text' | 'time-date';

const TextUtilities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('text');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [utilityType, setUtilityType] = useState<UtilityType>('base64');
  const [operation, setOperation] = useState<OperationType>('encode');

  // Check if current utility type supports the selected operation
  const getValidOperations = (type: UtilityType): OperationType[] => {
    const encodeTypes = ['base64', 'url', 'html', 'uri', 'hex', 'binary'];
    const parseTypes = ['json', 'yaml', 'csv', 'querystring'];
    
    if (encodeTypes.includes(type)) {
      return ['encode', 'decode'];
    } else if (parseTypes.includes(type)) {
      return ['parse', 'unparse'];
    }
    return ['encode'];
  };

  // Auto-adjust operation when utility type changes
  const handleUtilityTypeChange = (newType: UtilityType) => {
    setUtilityType(newType);
    const validOps = getValidOperations(newType);
    if (!validOps.includes(operation)) {
      setOperation(validOps[0]);
    }
  };

  // Encoding/Decoding functions
  const handleEncode = () => {
    try {
      let result = '';
      switch (utilityType) {
        case 'base64':
          const base64Encoder = new TextEncoder();
          const base64Data = base64Encoder.encode(input);
          result = btoa(String.fromCharCode.apply(null, Array.from(base64Data)));
          break;
        case 'url':
          result = encodeURIComponent(input);
          break;
        case 'html':
          result = input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/[\u0080-\uFFFF]/g, (match) => {
              return '&#' + match.charCodeAt(0) + ';';
            });
          break;
        case 'uri':
          result = encodeURI(input);
          break;
        case 'hex':
          const hexEncoder = new TextEncoder();
          const hexBytes = hexEncoder.encode(input);
          result = Array.from(hexBytes).map(b => b.toString(16).padStart(2, '0')).join('');
          break;
        case 'binary':
          const binaryEncoder = new TextEncoder();
          const binaryBytes = binaryEncoder.encode(input);
          result = Array.from(binaryBytes).map(b => b.toString(2).padStart(8, '0')).join(' ');
          break;
        default:
          result = input;
      }
      setOutput(result);
    } catch (error) {
      setOutput('Error: Invalid input for encoding');
    }
  };

  const handleDecode = () => {
    try {
      let result = '';
      switch (utilityType) {
        case 'base64':
          const binaryString = atob(input);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const decoder = new TextDecoder('utf-8');
          result = decoder.decode(bytes);
          break;
        case 'url':
          result = decodeURIComponent(input);
          break;
        case 'html':
          result = input
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)))
            .replace(/&#([0-9]+);/g, (match, dec) => String.fromCharCode(parseInt(dec, 10)));
          break;
        case 'uri':
          result = decodeURI(input);
          break;
        case 'hex':
          const hexBytes = input.match(/.{1,2}/g) || [];
          const hexData = new Uint8Array(hexBytes.map(byte => parseInt(byte, 16)));
          const hexDecoder = new TextDecoder('utf-8');
          result = hexDecoder.decode(hexData);
          break;
        case 'binary':
          const binaryBytes = input.split(' ').filter(b => b.length === 8);
          const binaryData = new Uint8Array(binaryBytes.map(byte => parseInt(byte, 2)));
          const binaryDecoder = new TextDecoder('utf-8');
          result = binaryDecoder.decode(binaryData);
          break;
        default:
          result = input;
      }
      setOutput(result);
    } catch (error) {
      setOutput('Error: Invalid input for decoding');
    }
  };

  // Parsing/Unparsing functions
  const handleJsonParse = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (error) {
      setOutput('Error: Invalid JSON format');
    }
  };

  const handleJsonUnparse = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (error) {
      setOutput('Error: Invalid JSON format');
    }
  };

  const handleYamlParse = () => {
    try {
      const lines = input.split('\n');
      const result: any = {};
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split(':');
          if (valueParts.length > 0) {
            const value = valueParts.join(':').trim();
            result[key.trim()] = value;
          }
        }
      });
      
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput('Error: Invalid YAML format');
    }
  };

  const handleYamlUnparse = () => {
    try {
      const parsed = JSON.parse(input);
      let yamlOutput = '';
      
      Object.entries(parsed).forEach(([key, value]) => {
        yamlOutput += `${key}: ${value}\n`;
      });
      
      setOutput(yamlOutput);
    } catch (error) {
      setOutput('Error: Invalid JSON format for YAML conversion');
    }
  };

  const handleCsvParse = () => {
    try {
      const lines = input.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        return obj;
      });
      
      setOutput(JSON.stringify(data, null, 2));
    } catch (error) {
      setOutput('Error: Invalid CSV format');
    }
  };

  const handleCsvUnparse = () => {
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data) || data.length === 0) {
        setOutput('Error: Input must be an array of objects');
        return;
      }
      
      const headers = Object.keys(data[0]);
      let csvOutput = headers.join(',') + '\n';
      
      data.forEach(row => {
        const values = headers.map(header => {
          const val = row[header] || '';
          return /[",\n]/.test(val) ? `"${val.replace(/"/g, '""')}"` : val;
        });
        csvOutput += values.join(',') + '\n';
      });
      
      setOutput(csvOutput);
    } catch (error) {
      setOutput('Error: Invalid JSON format for CSV conversion');
    }
  };

  const handleQueryStringParse = () => {
    try {
      const params = new URLSearchParams(input);
      const result: any = {};
      
      params.forEach((value, key) => {
        result[key] = value;
      });
      
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput('Error: Invalid query string format');
    }
  };

  const handleQueryStringUnparse = () => {
    try {
      const parsed = JSON.parse(input);
      const params = new URLSearchParams();
      
      Object.entries(parsed).forEach(([key, value]) => {
        params.append(key, String(value));
      });
      
      setOutput(params.toString());
    } catch (error) {
      setOutput('Error: Invalid JSON format for query string conversion');
    }
  };

  const handleProcess = () => {
    switch (operation) {
      case 'encode':
        handleEncode();
        break;
      case 'decode':
        handleDecode();
        break;
      case 'parse':
        switch (utilityType) {
          case 'json':
            handleJsonParse();
            break;
          case 'yaml':
            handleYamlParse();
            break;
          case 'csv':
            handleCsvParse();
            break;
          case 'querystring':
            handleQueryStringParse();
            break;
        }
        break;
      case 'unparse':
        switch (utilityType) {
          case 'json':
            handleJsonUnparse();
            break;
          case 'yaml':
            handleYamlUnparse();
            break;
          case 'csv':
            handleCsvUnparse();
            break;
          case 'querystring':
            handleQueryStringUnparse();
            break;
        }
        break;
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleSwap = () => {
    setInput(output);
    setOutput(input);
  };

  const getPlaceholder = () => {
    const encodeTypes = ['base64', 'url', 'html', 'uri', 'hex', 'binary'];
    
    if (encodeTypes.includes(utilityType)) {
      return operation === 'encode' 
        ? `Enter text to ${operation} using ${utilityType.toUpperCase()}...`
        : `Enter ${utilityType.toUpperCase()} text to ${operation}...`;
    }
    
    switch (utilityType) {
      case 'json':
        return operation === 'parse' 
          ? 'Enter JSON to format...' 
          : 'Enter formatted JSON to minify...';
      case 'yaml':
        return operation === 'parse' 
          ? 'Enter YAML to convert to JSON...' 
          : 'Enter JSON to convert to YAML...';
      case 'csv':
        return operation === 'parse' 
          ? 'Enter CSV to convert to JSON...' 
          : 'Enter JSON array to convert to CSV...';
      case 'querystring':
        return operation === 'parse' 
          ? 'Enter query string to parse...' 
          : 'Enter JSON object to convert to query string...';
      default:
        return `Enter text to ${operation}...`;
    }
  };


  const renderTextUtilities = () => (
    <>
      <h2>Text Utilities</h2>
      
      <div className="controls">
        <div className="control-group">
          <label htmlFor="utility-type">Type:</label>
          <select
            id="utility-type"
            value={utilityType}
            onChange={(e) => handleUtilityTypeChange(e.target.value as UtilityType)}
          >
            <optgroup label="Encoding">
              <option value="base64">Base64</option>
              <option value="url">URL</option>
              <option value="html">HTML</option>
              <option value="uri">URI</option>
              <option value="hex">Hex</option>
              <option value="binary">Binary</option>
            </optgroup>
            <optgroup label="Data Format">
              <option value="json">JSON</option>
              <option value="yaml">YAML</option>
              <option value="csv">CSV</option>
              <option value="querystring">Query String</option>
            </optgroup>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="operation">Operation:</label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value as OperationType)}
          >
            {getValidOperations(utilityType).map(op => (
              <option key={op} value={op}>
                {op.charAt(0).toUpperCase() + op.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <button onClick={handleProcess} className="process-btn">
            {operation.charAt(0).toUpperCase() + operation.slice(1)}
          </button>
          <button onClick={handleSwap} className="swap-btn">
            Swap
          </button>
          <button onClick={handleClear} className="clear-btn">
            Clear
          </button>
        </div>
      </div>

      <div className="text-areas">
        <div className="textarea-group">
          <label htmlFor="input">Input:</label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholder()}
            rows={10}
          />
        </div>

        <div className="textarea-group">
          <label htmlFor="output">Output:</label>
          <textarea
            id="output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
            rows={10}
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="text-utilities-container">
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          Text Utilities
        </button>
        <button
          className={`tab-button ${activeTab === 'time-date' ? 'active' : ''}`}
          onClick={() => setActiveTab('time-date')}
        >
          Time & Date
        </button>
      </div>
      
      {activeTab === 'text' && renderTextUtilities()}
      {activeTab === 'time-date' && <TimeDate />}
    </div>
  );
};

export default TextUtilities;
