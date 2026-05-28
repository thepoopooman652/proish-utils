# Proish Utils v2

**Proish Utils** is a high-performance, environment-agnostic JavaScript utility library designed to handle the repetitive "grunt work" of programming. Whether you are building a Node.js backend or a complex frontend browser application, Proish Utils provides a standardized, tested, and optimized set of tools to accelerate your development.

## Quick Start

### Browser Integration
Simply include the script in your HTML file:

```html
<script src="proish-utils.js"></script>
<script>
    // The library is available globally as proishUtils
    console.log(proishUtils.strings.reverse("Hello!")); 
</script>
```

### Node.js Integration
```javascript
const { proishUtils, config } = require('./proish-utils.js');

// Example: Use the crypto hashing tool
(async () => {
    const hash = await proishUtils.cryptoFuncs.hash.SHA256("secret-data");
    console.log(hash);
})();
```

---

## API Documentation

### `strings` (Basic Text)
| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `reverse(str)` | `str` (String) | Reverses a string. | `reverse("abc")` $\rightarrow$ `"cba"` |
| `isPalindrome(str)`| `str` (String) | Checks if string is a palindrome. | `isPalindrome("Racecar")` $\rightarrow$ `true` |
| `trimSpaces(str)` | `str` (String) | Removes all whitespace. | `trimSpaces(" a b c ")` $\rightarrow$ `"abc"` |
| `generateString(len)`| `len` (Number) | Generates a random alphanumeric string. | `generateString(10)` $\rightarrow$ `"x7T2pL9qR1"` |
| `leftpad(str, len, ch)`| `str, len, ch` | Pads string to a length with a char. | `leftpad("5", 3, "0")` $\rightarrow$ `"005"` |

### `text` (Advanced Transformation)
| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `toKebabCase(str)` | `str` (String) | Converts to `kebab-case`. | `toKebabCase("User Profile")` $\rightarrow$ `"user-profile"` |
| `toCamelCase(str)` | `str` (String) | Converts to `camelCase`. | `toCamelCase("user_name")` $\rightarrow$ `"userName"` |
| `toPascalCase(str)` | `str` (String) | Converts to `PascalCase`. | `toPascalCase("user name")` $\rightarrow$ `"UserName"` |
| `slugify(str)` | `str` (String) | Creates a URL-friendly slug. | `slugify("Hello World!")` $\rightarrow$ `"hello-world"` |
| `truncate(str, len, suf)`| `str, len, suf` | Cuts string at length and adds suffix. | `truncate("Long Text", 4)` $\rightarrow$ `"Long..."` |

### `cryptoFuncs` (Security)
| Function | Parameters | Description | Note |
| :--- | :--- | :--- | :--- |
| `genUUID()` | None | Generates a cryptographically secure UUID. | Sync |
| `hash.SHA256(str)` | `str` (String) | Returns SHA-256 hex hash. | **Async** |
| `hash.SHA384(str)` | `str` (String) | Returns SHA-384 hex hash. | **Async** |
| `hash.SHA512(str)` | `str` (String) | Returns SHA-512 hex hash. | **Async** |

### `trig` & `geometry` (Math & Space)
| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `haversineDistance(...)`| `lat1, lon1, lat2, lon2, unit, prec`| Distance between GPS points. | `haversineDistance(40, -70, 34, -118, 'miles', 2)` |
| `distance2D(...)` | `x1, y1, x2, y2` | Straight-line distance between 2D points. | `distance2D(0,0, 3,4)` $\rightarrow$ `5` |
| `isPointInCircle(...)` | `px, py, cx, cy, rad` | Check if point is inside a circle. | `isPointInCircle(1,1, 0,0, 5)` $\rightarrow$ `true` |
| `toRad(deg)` | `deg` (Number) | Degrees to Radians. | `toRad(180)` $\rightarrow$ `3.14...` |

### `math` & `numbers` (Arithmetic & Finance)
| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `clamp(val, min, max)` | `val, min, max` | Restricts value to a range. | `clamp(110, 0, 100)` $\rightarrow$ `100` |
| `lerp(start, end, amt)` | `start, end, amt` | Linear interpolation. | `lerp(10, 20, 0.5)` $\rightarrow$ `15` |
| `formatCurrency(val)` | `val` (Number) | Formats number as currency. | `formatCurrency(10.5)` $\rightarrow$ `"$10.50"` |
| `formatPercent(val)` | `val` (Number) | Formats decimal as percentage. | `formatPercent(0.15)` $\rightarrow$ `"15.00%"` |
| `randomInt(min, max)` | `min, max` | Random integer between bounds. | `randomInt(1, 10)` $\rightarrow$ `7` |

### `async` (Flow Control)
| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `sleep(ms)` | `ms` (Number) | Returns a promise that resolves after delay. | `await sleep(1000)` |
| `retry(fn, retries, delay)`| `fn, retries, delay` | Attempts a function multiple times. | `await retry(() => fetchUrl(), 3, 500)` |
| `timeout(promise, ms)` | `promise, ms` | Rejects a promise if it takes too long. | `await timeout(myPromise, 2000)` |

### `collections` & `arrays` (Data Structures)
| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `deepClone(obj)` | `obj` (Object) | Recursive copy (prevents circular refs). | `deepClone(myComplexObj)` |
| `unique(arr)` | `arr` (Array) | Removes duplicate values. | `unique([1, 1, 2])` $\rightarrow$ `[1, 2]` |
| `groupBy(arr, key)` | `arr, key` | Groups array by key or function. | `groupBy(users, 'role')` |
| `intersect(a, b)` | `a, b` (Arrays) | Finds common elements. | `intersect([1,2], [2,3])` $\rightarrow$ `[2]` |
| `shuffle(arr)` | `arr` (Array) | Returns a randomized copy of the array. | `shuffle([1,2,3])` |

### `is` & `validation` (Verification)
| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `isEmpty(val)` | `val` (Any) | Checks if string/array/obj is empty. | `isEmpty("")` $\rightarrow$ `true` |
| `isEmail(str)` | `str` (String) | Basic email format validation. | `isEmail("test@me.com")` $\rightarrow$ `true` |
| `isStrongPassword(pwd)`| `pwd` (String) | Validates vs config security rules. | `isStrongPassword("Pass123!")` |
| `isCreditCard(num)` | `num` (String) | Luhn Algorithm validation. | `isCreditCard("499273...")` |

### `url` & `connectionInfo` (Network)
| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `getUserIP()` | None | Fetches public IP of the user. | `await getUserIP()` $\rightarrow$ `"1.2.3.4"` |
| `getQueryParams(url)` | `url` (String) | Parses URL query into an object. | `getQueryParams("...?id=1")` $\rightarrow$ `{id: '1'}` |
| `setQueryParam(...)` | `url, key, val` | Adds/Updates a URL parameter. | `setQueryParam(url, 'page', '2')` |

### `ui` & `dom` (Browser Interface)
| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `copyToClipboard(text)`| `text` (String) | Copies text to system clipboard. | `await copyToClipboard("Hi!")` |
| `setCookie(n, v, d)` | `name, val, days` | Saves a cookie to the browser. | `setCookie("user", "admin", 7)` |
| `fadeIn(el)` | `el` (HTMLElement) | Smoothly fades in an element. | `await fadeIn(myDiv)` |
| `toggleClass(el, cls)`| `el, className` | Toggles a CSS class. | `toggleClass(myDiv, "active")` |

### `node` (Server-Side)
| Function | Parameters | Description | Example |
| :--- | :--- | :--- | :--- |
| `readJson(path)` | `path` (String) | Reads and parses a JSON file. | `readJson('./config.json')` |
| `writeJson(path, data)`| `path, data` | Writes object to JSON file. | `writeJson('./save.json', {score: 10})` |
| `fileExists(path)` | `path` (String) | Checks if file exists on disk. | `fileExists('./index.js')` |

---

## Configuration

You can customize the behavior of the library by modifying the `config` object before calling the utilities.

```javascript
proishUtils.config.logging.level = "debug"; // Show all logs
proishUtils.config.text.slugify.separator = "_"; // Slugs become "hello_world"
proishUtils.config.validation.passwordRequirements.minLength = 12; // Require 12 chars
```

## 📜 License
This project is licensed under the **GNU GPL v3 or later**. See the license text in the source code for details.
