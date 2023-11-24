import React, { useState, ChangeEvent } from 'react';
import './CodeEditor.css';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>(
    // Initial code content
    `<html>
	<body>
		<form action="https://cpen422bankgiveaway.com/transfer" method="POST">
			<input type="hidden" name="from" value="cpen422hacker" />
			<input type="hidden" name="to" value="Bob" />
			<input type="hidden" name="amount" value="1000000" />
			<input type="hidden" name="key" value="/* Write Key Here */" />
			<input type="submit" value="Submit" />
		</form>
	</body>
</html>
}`
  );

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
	console.log(code.split('\n'))
  };

  return (
    <div className="code-editor">
      <div className="line-numbers">
        {code.split('\n').map((_, index) => (
          <div key={index + 1}>{index + 1}</div>
        ))}
      </div>
      <textarea
        className="code-input"
        value={code}
        onChange={handleCodeChange}
        placeholder="Enter your code here..."
      />
    </div>
  );
};

export default CodeEditor;
