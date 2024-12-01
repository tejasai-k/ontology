import React, { useState, useEffect } from "react";
import axios from "axios";
import './NumberYTheoryApp.css';
import {checkNumberProperties} from '../utils.js'
import {toast} from 'react-toastify';

const NumberTheoryApp = () => {
  const [number, setNumber] = useState("");
  const [results, setResults] = useState([]);
  const [ontology, setOntology] = useState(null);

  // Load and parse XML file on component mount
  useEffect(() => {
    axios
      .get("/NumberTheory.xml")
      .then((response) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "application/xml");
        setOntology(xmlDoc);
      })
      .catch((error) => console.error("Error loading XML:", error));
  }, []);

  const checkNumberType = () => {
    if(!number){
      toast("Please enter the number")
      return
    } 
    if (!ontology) {
      setResults(["Ontology data not loaded yet."]);
      return;
    }

    const classifications = [];

    const checkCategory = (tag, label) => {
      const nodes = ontology.getElementsByTagName(tag);
      for (let i = 0; i < nodes.length; i++) {
        const valueNode = nodes[i].getElementsByTagName("nt:hasValue")[0];
        if (valueNode && valueNode.textContent === number) {
          classifications.push(`${number} is a ${label}.`);
        }
      }
    };

    // Check all categories
    checkCategory("nt:PrimeNumber", "Prime Number");
    checkCategory("nt:CompositeNumber", "Composite Number");
    checkCategory("nt:RationalNumber", "Rational Number");
    checkCategory("nt:IrrationalNumber", "Irrational Number");
    checkCategory("nt:TerminatingDecimal", "Terminating Decimal");
    checkCategory("nt:NonTerminatingDecimal", "Non-Terminating Decimal");
    checkCategory("nt:WholeNumber", "Whole Number");
    checkCategory("nt:NaturalNumber", "Natural Number");
    checkCategory("nt:NegativeNumber", "Negative Number");
    checkCategory("nt:Zero", "Zero");

    const properties = checkNumberProperties(number); // Assume checkNumberProperties is defined
  
    // Iterate over each property and classify
    for (const [key, value] of Object.entries(properties)) {
      switch (key) {
        case "isPrime":
          if (value) classifications.push(`${number} is a Prime number`);
          break;
        case "isComposite":
          if (value) classifications.push(`${number} is a Composite number`);
          break;
        case "isRational":
          if (value) classifications.push(`${number} is a Rational number`);
          else classifications.push(`${number} is an Irrational number`);
          break;
        case "isTerminating":
          if (value) classifications.push(`${number} has a Terminating decimal`);
          else classifications.push(`${number} has a Non-Terminating decimal`);
          break;
        case "isWhole":
          if (value) classifications.push(`${number} is a Whole number`);
          break;
        case "isNatural":
          if (value) classifications.push(`${number} is a Natural number`);
          break;
        case "isNegative":
          if (value) classifications.push(`${number} is a Negative number`);
          break;
        case "isZero":
          if (value) classifications.push(`${number} is Zero`);
          break;
        default:
          classifications.push(`Property ${key} is not recognized`);
          break;
      }
    }

    // Set the results
    if (classifications.length > 0) {
      setResults(classifications);
    } else {
      setResults([`${number} does not match any predefined category.`]);
    }
  };

  return (
    <div>
    <div className="container" >
      <h1>Number Theory </h1>
      <p>Please give any number and check how it is classified into different types</p>
      <div className="div-input-container" >

       <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
        placeholder="Enter a number"
        className="input-field"
        /> <br/>
        <button onClick={checkNumberType} className="check-btn" >Check Number Type</button>
        </div>
      <div className="result-div" >
        {results.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    </div>
  </div>
  );
};

export default NumberTheoryApp;
