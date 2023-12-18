//? 4.1 Generalizing Function Signatures
//! You have two functions that work the same, but on different and largely incompatible types.
//* Generalize their behavior using generics.



//? 4.2 Creating Related Function Arguments
//! You write functions where the second parameter is dependent on the first one.
//* Annotate each parameter with a generic type and create a relationship between them through generic constraints.


//? 4.3 Getting Rid of any and unknown
//! Generic type parameters, any, and unknown all seem to describe very wide sets of values. When should you use what?
//* Use generic type parameters when you get to the actual type eventually; refer to Recipe 2.2 on the decision between any and unknown.


//? 4.4 Understanding Generic Instantiation
//! You understand how generics are substituted for real types, but sometimes errors like “Foo is assignable to the constraint of type Bar, but could be instantiated with a different subtype of constraint Baz” confuse you.
//* Remember that values of a generic type can be—explicitly and implicitly—substituted with a variety of subtypes. Write subtype-friendly code.


//? 4.5 Generating New Object Types
//! You have a type in your application that is related to your model. Every time the model changes, you need to change your types as well.
//* Use generic mapped types to create new object types based on the original type.


//? 4.6 Modifying Objects with Assertion Signatures
//! After a certain function execution in your code, you know the type of a value has changed.
//* Use assertion signatures to change types independently of if and switch statements.


//? 4.7 Mapping Types with Type Maps
//! You write a factory function that creates an object of a specific subtype based on a string identifier, and there are a lot of possible subtypes.
//* Store all subtypes in a type map, widen with index access, and use mapped types like Partial<T>.


//? 4.8 Using ThisType to Define this in Objects
//! Your app requires complex configuration objects with methods, where this has a different context depending on usage.
//* Use the built-in generic ThisType<T> to define the correct this.


//? 4.9 Adding Const Context to Generic Type Parameters
//! When you pass complex, literal values to a function, TypeScript widens the type to something more general. While this is desired behavior in a lot of cases, in some you want to work on the literal types rather than the widened type.
//* Add a const modifier in front of your generic type parameter to keep the passed values in const context.

