//? 2.1 Annotating Effectively
// Annotate only when you want your types checked.

//*Type Inference
let aNumber = 2; // Type inferred as number

//*Type Annotation
const anotherNumber: number = 2; // Type annotation

//? 2.2 Working with any and unknown
//* Use any if you effectively want to deactivate typing; use unknown when you need to be cautious.

const anyValue: any = 2;
const unknownValue: unknown = 2;

//* any
anyValue.toFixed(); // No error

//* unknown
// unknownValue.toFixed(); // Error

//? 2.3 Choosing the Right Object Type