const filterObj = (obj, ...allowedFiled) => {
  const newObj = {};
  Object.keys(obj).forEach((ele) => {
    if (allowedFiled.includes(ele)) {
        return newObj[ele] = obj[ele]
    }
  });
};

export default filterObj;
