# google-doc-template-copier 
A program to make copying pre-written email templates and adding in values like company name and contact name. Useful for people working in sales, recruitment, or any other kind of field where you are blasting out cold emails. 


Google Apps script does not have an API for directly copying text from the document, nor is there a first class way of accessing the format of document elements in relation to one another. This program basically traverses each node of the Google Doc tree, constructing meta data about each element (like what React does, but on a much simpler scale), then reconstructs that data into HTML that can copied to the user's clipboard. 

Supports: 
  - Inline links 
  - Lists up to one level deep 
  - Line breaks, and other shortened lines

This project is in beta at the moment, and is purely MVP for the task at hand. 
