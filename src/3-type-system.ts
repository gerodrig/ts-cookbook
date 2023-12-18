
//? 3.1 Modeling Data with Union and Intersection Types
/** //* Overview
Exploring how to use union and intersection types in TypeScript to model complex data structures.
 */

type ToyBase = { name: string; price: number; quantity: number; minimumAge: number; };
type Doll = ToyBase & { material: string; };
type BoardGame = ToyBase & { minPlayers: number; maxPlayers: number; };
type Puzzle = ToyBase & { pieces: number; };

// Define a function to print details of a toy. It accepts any toy type that extends ToyBase.
type Toy = Doll | BoardGame | Puzzle; // Union Type
function printToy(toy: ToyBase) { /* ... */ }

//? 3.2 Explicitly Defining Models with Discriminated Union Types

// Define a type for Circle with a unique kind property set to "circle".
type Circle = { 
    radius: number; // property specific to Circle
    kind: "circle"; // discriminant property with a literal type
  };
  
  // Define a type for Square with a unique kind property set to "square".
  type Square = { 
    x: number; // property specific to Square
    kind: "square"; // discriminant property with a literal type
  };
  
  // Define a type for Triangle with a unique kind property set to "triangle".
  type Triangle = { 
    x: number; // shared property with Square
    y: number; // additional property unique to Triangle
    kind: "triangle"; // discriminant property with a literal type
  };
  
  // Create a union type Shape that can be either a Circle, Triangle, or Square.
  type Shape = Circle | Triangle | Square;
  
  // Define a function to calculate the area of a Shape.
  function area(shape: Shape) {
    switch (shape.kind) { // Use the discriminant property to differentiate between types
      case "circle":
        return Math.PI * shape.radius ** 2; 
  
      case "triangle":
        return (shape.x * shape.y) / 2; 
  
      case "square":
        return shape.x ** 2; 
  
      default:
        throw Error("Not possible");
    }
  }
  
//? 3.3 Exhaustiveness Checking with the Assert never Technique

/* //*Use the assertNever function for exhaustiveness checks to assert that unhandled cases can never occur.
*/

// Define discriminated union types for shapes
type Circle3 = { radius: number; kind: "circle"; };
type Square3 = { x: number; kind: "square"; };
type Triangle3 = { x: number; y: number; kind: "triangle"; };

// Combine shapes into a union type
type Shape3 = Circle3 | Triangle3 | Square3;

// Function to calculate the area of a shape, using a switch-case
function area2(shape: Shape3) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // Area of Circle
    case "triangle":
      return (shape.x * shape.y) / 2;     // Area of Triangle
    case "square":
      return shape.x ** 2;                // Area of Square
    default:
      // Default case to handle unexpected shapes
      assertNever(shape); // Throws an error if a new shape type is not handled
  }
}

// assertNever function: Ensures all cases are handled
function assertNever(value: never): never {
  throw new Error(`Unhandled shape: ${JSON.stringify(value)}`);
}

// Example usage
const myShape: Shape3 = { x: 10, kind: "square" };
console.log(area(myShape)); // Correctly calculates the area of a square

//? 3.4 Pinning Types with Const Context 
/* //* Use const context (as const) and type assertions to pin object literals to their exact types.
*/

// Define discriminated union types for shapes
type Circle4 = { radius: number; kind: "circle"; };
type Square4 = { x: number; kind: "square"; };
type Shape4 = Circle4 | Square4;

// Function to calculate the perimeter of a shape
function perimeter(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return 2 * Math.PI * shape.radius;
    case "square":
      return 4 * shape.x;
  }
}

// Define a circle using const context
const myCircle = {
  radius: 1,
  kind: "circle",
} as const;

perimeter(myCircle); // Correctly recognized as Circle type

//? 3.5 Narrowing Types with Type Predicates
/* //* Add type predicates to a helper function’s signature to indicate the impact of a Boolean condition for the type system.
*/

// Define a type for a six-sided dice
type Dice = 1 | 2 | 3 | 4 | 5 | 6;

// Function to check if a number is a valid dice roll
function isDice(value: number): value is Dice {
  // Type predicate: value is Dice
  return [1, 2, 3, 4, 5, 6].includes(value);
}

// Function to simulate a dice roll
function rollDice(input: number) {
  if (isDice(input)) {
    // TypeScript now understands `input` as type `Dice`
    console.log("Rolled a valid dice number:", input);
  } else {
    console.log("Invalid dice roll:", input);
  }
}

// Example usage
rollDice(4); // Valid dice roll
rollDice(7); // Invalid dice roll

//? 3.6 Understanding void
//* Demonstration of void in TypeScript Annotate with any or unknown and use type predicates (see Recipe 3.5 to narrow to specific error types).

// A function that logs a message and returns void (implicitly returns undefined)
function logMessage(message: string): void {
    console.log(message);
  }
  
  // A function that takes a callback with a void return type
  function processWithCallback(callback: (data: string) => void): void {
    const data = "Sample Data";
    callback(data); // Callback function is called with data
  }
  
  // Callback function that logs the data and returns nothing (void)
  function simpleCallback(data: string): void {
    console.log("Callback received data:", data);
  }
  
  // Using the processWithCallback function with simpleCallback
  processWithCallback(simpleCallback);
  
  // A callback function that returns a boolean, but is still acceptable 
  // because the return type is substitutable for void
  function checkCallback(data: string): boolean {
    console.log("Checking data:", data);
    return true;
  }
  
  // Using processWithCallback with a callback that returns a boolean
  // This is allowed due to substitutability
  processWithCallback(checkCallback);
  
  //? 3. Dealing with Error Types in catch Clauses
  //* Use the optional never technique to exclude certain properties.

  // TypeScript example demonstrating error handling in try-catch blocks

// Custom error class for demonstration
class MyCustomError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "MyCustomError";
    }
  }
  
  // Function that may throw different types of errors
  function riskyOperation() {
    const random = Math.random();
    if (random > 0.6) throw new MyCustomError("Custom error occurred");
    if (random > 0.3) throw new TypeError("Type error occurred");
    throw "A string error";
  }
  
  // Using try-catch for error handling
  try {
    riskyOperation();
  } catch (error) {
    // TypeScript only allows 'any' or 'unknown' as type annotation in catch clauses
    if (error instanceof MyCustomError) {
      console.log("Handled MyCustomError:", error.message);
    } else if (error instanceof TypeError) {
      console.log("Handled TypeError:", error.message);
    } else if (typeof error === "string") {
      console.log("Handled string error:", error);
    } else {
      console.log("Unhandled error:", error);
    }
  }
  
  //? 3.8 Creating Exclusive Or Models with Optional never
  //* Use the optional never technique to exclude certain properties.

// TypeScript example for creating exclusive or models using optional never

// Base type for select operations
type SelectBase = {
    options: string[];
  };
  
  // Type for single select with an exclusive property `values` of type never
  type SingleSelect = SelectBase & {
    value: string;
    values?: never; // Ensures exclusivity with MultipleSelect
  };
  
  // Type for multiple select with an exclusive property `value` of type never
  type MultipleSelect = SelectBase & {
    value?: never;  // Ensures exclusivity with SingleSelect
    values: string[];
  };
  
  // Union type that combines SingleSelect and MultipleSelect
  type SelectProperties = SingleSelect | MultipleSelect;
  
  // Function to handle select callback
  function selectCallback(params: SelectProperties) {
    if ('value' in params) {
      console.log("Single Select:", params.value);
    } else if ('values' in params) {
      console.log("Multiple Select:", params.values);
    }
  }
  
  // Correct usage of selectCallback
  selectCallback({ options: ["option1", "option2"], value: "option1" }); // Single Select
  selectCallback({ options: ["option1", "option2"], values: ["option1", "option2"] }); // Multiple Select
  
  // Incorrect usage - TypeScript will raise an error
  // selectCallback({ options: ["option1", "option2"], values: ["option1"], value: "option1" });

  
//? 3.9 Effectively Using Type Assertions

//* Use type assertions to narrow to a smaller set using the as keyword, indicating an unsafe operation.
// TypeScript example demonstrating the use of type assertions

// Define a type for a dice roll
type Dice9 = 1 | 2 | 3 | 4 | 5 | 6;

// Function to simulate rolling a dice
function rollDice9(): Dice9 {
  // Generate a random number between 1 and 6
  let num = Math.floor(Math.random() * 6) + 1;
  // Assert that the generated number is a Dice type
  return num as Dice9;
}

// Example usage of rollDice
const diceRoll = rollDice9();
console.log("Dice roll:", diceRoll);

// Example of creating a Person object with type assertions
type Person = {
  name: string;
  age: number;
};

function createDemoPerson(name: string): Person {
  // Asserting an empty object to be of type Person
  const person = {} as Person;
  person.name = name;
  person.age = Math.floor(Math.random() * 95);
  return person;
}

// Using createDemoPerson function
const demoPerson = createDemoPerson("John Doe");
console.log("Demo Person:", demoPerson);

//? 3.10 Using Index Signatures
//* Use index signatures to define an open set of keys but with defined value types.
// TypeScript example demonstrating the use of index signatures

// Define a type for metrics
type Metrics = {
    ttfb: number; // Time to first byte
    fcp: number;  // First contentful paint
    si: number;   // Speed Index
    lcp: number;  // Largest contentful paint
    tti: number;  // Time to interactive
    tbt: number;  // Total blocking time
  };
  
  // Define a type for a collection of metrics with dynamic keys
  type MetricCollection = {
    [domain: string]: Metrics | undefined;
  };
  
  // Function to find the domain with the lowest timing for a specific metric
  function findLowestTiming(collection: MetricCollection, metric: keyof Metrics): string {
    let result = { domain: "", value: Number.MAX_VALUE };
    for (const domain in collection) {
      const timing = collection[domain];
      // Extra check for undefined values
      if (timing && timing[metric] < result.value) {
        result = { domain, value: timing[metric] };
      }
    }
    return result.domain;
  }
  
  // Example metrics data
  const timings: MetricCollection = {
    "example.com": { ttfb: 100, fcp: 200, si: 300, lcp: 400, tti: 500, tbt: 10 },
    "test.com": { ttfb: 150, fcp: 250, si: 350, lcp: 450, tti: 550, tbt: 20 }
  };
  
  // Using findLowestTiming function
  const domainWithLowestTTFB = findLowestTiming(timings, "ttfb");
  console.log("Domain with lowest TTFB:", domainWithLowestTTFB);

//? 3.11  Distinguishing Missing Properties and Undefined Values
//* Activate exactOptionalPropertyTypes in tsconfig to enable stricter handling of optional properties.

// TypeScript example for handling optional properties and undefined values

// Enabling exactOptionalPropertyTypes in tsconfig changes the behavior of optional properties

// Define a Settings type with an optional theme property
type Settings = {
    language: "en" | "de" | "fr";
    theme?: "dracula" | "monokai" | "github";
  };
  
  // Function to get the theme from settings
  function getTheme(settings: Settings) {
    // Using nullish coalescing to provide a default value if theme is undefined
    return settings.theme ?? "default";
  }
  
  // Example settings object with language only
  const settings: Settings = { language: "de" };
  
  // Example settings object with language and undefined theme
  // With exactOptionalPropertyTypes, this assignment would cause a TypeScript error
  const settingsUndefinedTheme: Settings = { language: "de", theme: undefined };
  
  // Demonstration of how getTheme function behaves with different settings
  console.log(getTheme(settings)); // Outputs "default"
  console.log(getTheme(settingsUndefinedTheme)); // Outputs "default" with nullish coalescing
  
  // Error example (commented out)
  // With exactOptionalPropertyTypes enabled, the following assignment would be invalid
  // const settingsError: Settings = { language: "de", theme: undefined };

  
//? 3.12 Working with Enums
//* Use them sparingly, prefer const enums, know their caveats, and maybe choose union types instead.

// TypeScript example for working with Enums

// Defining a numeric enum
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
  }
  
  // Using enum as a type for function parameter
  function move(direction: Direction) {
    console.log("Moving direction:", direction);
  }
  
  // Calling the function with an enum value
  move(Direction.Up); // Using enum as a value
  
  // Defining a string enum
  enum Status {
    Admin = "Admin",
    User = "User",
    Moderator = "Moderator"
  }
  
  // Function using string enum as a type
  function setUserStatus(status: Status) {
    console.log("Setting user status to:", status);
  }
  
  setUserStatus(Status.Admin); // Correct usage of string enum
  
  // Alternative to enum: Union type
  type UserRole = "Admin" | "User" | "Moderator";
  
  // Function using union type
  function setUserRole(role: UserRole) {
    console.log("Setting user role to:", role);
  }
  
  setUserRole("Admin"); // Using union type
  
  // Const object alternative to enum
  const Directions = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
  } as const;
  
  // Deriving union type from const object
  type DirectionType = (typeof Directions)[keyof typeof Directions];
  
  // Function using derived union type
  function moveDirection(direction: DirectionType) {
    console.log("Moving in direction:", direction);
  }
  
  moveDirection(Directions.Left); // Using derived union type

  
  //? 3.13 Defining Nominal Types in a Structural Type System
  //* Use wrapping classes or create an intersection of your primitive type with a literal object type and use this to differentiate two integers.

  // TypeScript example for creating nominal types

// Wrapping class approach for nominal typing
class Balance {
    private _nominal: void = undefined; // Private marker property for nominal typing
    value: number;
  
    constructor(value: number) {
      this.value = value;
    }
  }
  
  class AccountNumber {
    private _nominal: void = undefined; // Different private marker property
    value: number;
  
    constructor(value: number) {
      this.value = value;
    }
  }
  
  // Using the classes
  const account = new AccountNumber(12345678);
  const balance = new Balance(10000);
  
  // Function accepting only Balance type
  function acceptBalance(balance: Balance) {
    console.log("Balance accepted:", balance.value);
  }
  
  // Correct usage
  acceptBalance(balance);
  
  // Incorrect usage - TypeScript will raise an error due to nominal typing
  // acceptBalance(account);
  
  // Intersection of primitive type with a branded object type for nominal typing
  type Credits = number & { _kind: "credits" };
  type Debit = number & { _kind: "debit" };
  
  // Creating nominal types using type assertions
  const creditAmount = 10000 as Credits;
  const debitAmount = 5000 as Debit;
  
  // Function accepting only Credits type
  function processCredits(amount: Credits) {
    console.log("Processing credits:", amount);
  }
  
  // Correct usage
  processCredits(creditAmount);
  
  // Incorrect usage - TypeScript will raise an error due to nominal typing
  // processCredits(debitAmount);

  
  //? 3.14 Enabling Loose Autocomplete for String Subsets
  //* Add string & {} to your union type of string literals.

  // TypeScript example demonstrating how to enable autocomplete for string subsets

// Define a type for content types with predefined options and allow any string
type ContentType = "post" | "page" | "asset" | (string & {});

// Entry type as a placeholder for content entries
type Entry = {
  // Placeholder properties for the Entry type
};

// Function to retrieve entries based on the content type
function retrieve(contentType: ContentType): Entry[] {
  // Placeholder implementation for retrieving entries
  console.log(`Retrieving entries of type: ${contentType}`);
  return []; // Returns an array of Entry objects
}

// Usage of the retrieve function
retrieve("post"); // Autocomplete suggests "post", "page", "asset"
retrieve("customType"); // Custom types are also allowed
