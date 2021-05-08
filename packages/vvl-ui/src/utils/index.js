import dedent from "dedent";

let uid = 0;
export function getUID() {
  return ++uid;
}

export function toVue(componentData, isPreviewCode = true) {
  let defineData = {};

  // 获取属性值
  function getAttrVal(val) {
    return typeof val == "object" ? val.value : val;
  }
  // 属性是否为布尔型
  /*function attrBoolean(key, val) {
    return isBoolean(val) ? (val ? " " + key : "") : ` ${key}="${val}"`;
  }*/
  function getAttr(key, val) {
    if (isBoolean(val)) {
      return val ? " " + key : "";
    }
    if (isNumber(val)) {
      return ` :${key}="${val}"`;
    } else {
      return ` ${key}="${val}"`;
    }
    //return typeof val == 'boolean' ? (val ? ' ' + key : '') : ` ${key}="${val}"`
  }
  // 转html结构
  function toHTML(arr) {
    if (!(arr && Array.isArray(arr))) return;
    let code = "";
    arr.forEach((item) => {
      if (item.name) {
        let attrs = "";

        Object.keys(item.attrs).forEach((attrKey) => {
          let attrVal = getAttrVal(item.attrs[attrKey]);
          if (attrKey == "v-model") {
            defineData[attrVal] = "";
          }
          attrs += getAttr(attrKey, attrVal);
        });
        let attrSign = isPreviewCode
          ? ""
          : ` data-id="${item.id}" data-name="${item.name}"`;
        code += `<${item.name}${attrs}${attrSign}>${
          item.children ? toHTML(item.children) : item.text ? item.text : ""
        }</${item.name}>\n`;
      }
    });
    return code;
  }
  // 转data
  function toData(obj) {
    let str = "";
    for (let key in obj) {
      str += `${key}: '',`;
    }
    return str;
  }
  let template = toHTML(componentData);
  let data = toData(defineData);

  return dedent`
                <template>
                ${template}
                </template>

                <script>
                export default {
                  data() {
                    return {
                      ${data}
                    }
                  }
                }
                ${"</script>"}

                <style lang="scss" scoped></style>
                `;
}

export function parseVue(source, type) {
  const regex = new RegExp(`<${type}[^>]*>`);
  let openingTag = source.match(regex);

  if (!openingTag) return "";
  else openingTag = openingTag[0];

  return source.slice(
    source.indexOf(openingTag) + openingTag.length,
    source.lastIndexOf(`</${type}>`)
  );
}

export function isString(val) {
  return typeof val === "string";
}

export function isNumber(val) {
  return typeof val === "number";
}

export function isBoolean(val) {
  return typeof val === "boolean";
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) == "[object Object]";
}

export function isFunction(val) {
  return Object.prototype.toString.call(val) == "[object Function]";
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function merge(obj = {}, obj2) {
  for (let key in obj2) {
    if (isArray(obj2[key])) {
      obj[key] = [...obj2[key]];
    } else if (isObject(obj2[key])) {
      obj[key] = merge(obj[key], obj2[key]);
    } else {
      obj[key] = obj2[key];
    }
  }
  return obj;
}

//export function includes(collection, value) {}

//export function get(object, path, defaultValue = undefined) {}

export function find(arr, args, children = "children") {
  if (!isArray(arr)) return;
  let target;
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (args && args(item)) {
      target = item;
      break;
    } else if (item[children]) {
      target = find(item[children], args, children);
    }
  }
  return target;
}

export function each(arr, cb, children = "children") {
  if (!isArray(arr)) return;
  arr.forEach((item) => {
    if (item.children) {
      each(item.children, cb, children);
    } else {
      cb(item);
    }
  });
}
