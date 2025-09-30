# Notes: Managing Packages with NPM (FreeCodeCamp BackEnd Development \& APIs)

## **1. Role \& Structure of package.json**

- **package.json** is the central configuration file for any Node.js project or npm package.[^1]
- It’s a JSON object with key-value pairs detailing project metadata, dependencies, and scripts.
- **Required fields:**
    - **name**: Project/package name
    - **version**: Current version in MAJOR.MINOR.PATCH SemVer format

**Example:**

```json
{
  "name": "my-awesome-app",
  "version": "1.0.0"
}
```

*You can create package.json by running:*

- `npm init` (guided prompts)
- `npm init -y` (accepts all defaults)

***

## **2. Author, Description, Keywords, License**

### **author**

Identifies who created the project.

```json
"author": "Jane Doe"
```

For larger projects, this can be a detailed object with contact details.

### **description**

Short summary of what the project does.

```json
"description": "A project that does something awesome"
```

Helps users and maintainers quickly understand the project.

### **keywords**

Searchable tags to help others discover your project.

```json
"keywords": ["api", "backend", "nodejs", "freecodecamp"]
```


### **license**

Defines usage rights (e.g., MIT, BSD, Apache).

```json
"license": "MIT"
```

Always use double quotes and commas as needed in JSON.

***

## **3. Version Field \& Semantic Versioning (SemVer)**

- **Format:** MAJOR.MINOR.PATCH (e.g., "2.3.1")
    - **MAJOR**: Breaking/incompatible API changes
    - **MINOR**: New features, backward-compatible
    - **PATCH**: Bug fixes, backward-compatible

```json
"version": "1.2.0"
```


***

## **4. Dependencies \& External Packages**

### **Adding Packages**

Dependencies are stored under the `dependencies` key in package.json.

```json
"dependencies": {
  "express": "^4.14.0",
  "@freecodecamp/example": "1.1.0"
}
```

To add a package:

- Run `npm install express` (auto-adds to dependencies)
- Package versions matter for compatibility and updates.


### **Semantic Versioning Prefixes**

- **Exact version**: `"package": "1.2.13"` (only 1.2.13)
- **Tilde (~)**: `"package": "~1.2.13"` (any PATCH update for 1.2.x, e.g., 1.2.14)
- **Caret (^)**: `"package": "^1.2.13"` (any MINOR or PATCH for 1.x.x, e.g., 1.3.0, 1.4.2)

**Example:**

```json
"@freecodecamp/example": "~1.2.13" // latest patch updates in 1.2.x
"@freecodecamp/example": "^1.2.13" // latest minor and patch updates in 1.x.x
```


***

## **5. Modifying Dependencies**

- **Add a package:** Add its key-value to `dependencies` or use `npm install <package>`.
- **Remove a package:** Delete the line from `dependencies` or use `npm uninstall <package>`.

**Example: Remove a package**

```json
"dependencies": {
  "express": "^4.14.0"
}
```

Always ensure JSON syntax is correct (no trailing commas).

***

## **6. Practical Commands**

- Initialize `package.json`:
`npm init` (prompts for field values)
`npm init -y` (creates package.json with default values)
- Add a package:
`npm install <package>`
- Remove a package:
`npm uninstall <package>`
- Install all dependencies:
`npm install` (uses package.json)

***

## **7. Good Practices**

- Fill out author, description, keywords, and license for clarity and discoverability.
- Use SemVer to manage dependencies reliably and safely.
- Prefer "^" or "~" for dependencies to benefit from patches/minor upgrades, unless you need strict control.
- Commit `package.json` to version control but not `node_modules`.

***

# **Quick Reference Table**

| Field | Description | Example |
| :-- | :-- | :-- |
| name | Package name (required) | "my-app" |
| version | Package version (required, SemVer) | "1.2.0" |
| author | Author of the package | "Jane Doe" |
| description | Short description | "A backend API built with Node.js" |
| keywords | Tags to help discover your app | ["api", "node", "freecodecamp"] |
| license | Usage rights | "MIT" |
| dependencies | External packages used | {"express": "^4.14.0"} |


***

# **Summary**

- `package.json` organizes a Node.js project.
- Descriptive fields like author, description, keywords, and license make your project easy to use and discover.
- Use SemVer and dependency prefixes (~, ^) for reliable package management.
- Add and remove dependencies using `npm install` and `npm uninstall`.
- Always keep `package.json` updated and accurate for yourself and other developers.

<div align="center">⁂</div>

[^1]: https://nextjs.org/docs/pages/building-your-application/routing/api-routes

