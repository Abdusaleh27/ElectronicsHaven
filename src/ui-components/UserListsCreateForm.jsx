/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createUserLists } from "../graphql/mutations";
export default function UserListsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    shoppingList: "",
    wishList: "",
    currentSession: "",
  };
  const [shoppingList, setShoppingList] = React.useState(
    initialValues.shoppingList
  );
  const [wishList, setWishList] = React.useState(initialValues.wishList);
  const [currentSession, setCurrentSession] = React.useState(
    initialValues.currentSession
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setShoppingList(initialValues.shoppingList);
    setWishList(initialValues.wishList);
    setCurrentSession(initialValues.currentSession);
    setErrors({});
  };
  const validations = {
    shoppingList: [{ type: "Required" }],
    wishList: [{ type: "Required" }],
    currentSession: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          shoppingList,
          wishList,
          currentSession,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createUserLists.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserListsCreateForm")}
      {...rest}
    >
      <TextField
        label="Shopping list"
        isRequired={true}
        isReadOnly={false}
        value={shoppingList}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              shoppingList: value,
              wishList,
              currentSession,
            };
            const result = onChange(modelFields);
            value = result?.shoppingList ?? value;
          }
          if (errors.shoppingList?.hasError) {
            runValidationTasks("shoppingList", value);
          }
          setShoppingList(value);
        }}
        onBlur={() => runValidationTasks("shoppingList", shoppingList)}
        errorMessage={errors.shoppingList?.errorMessage}
        hasError={errors.shoppingList?.hasError}
        {...getOverrideProps(overrides, "shoppingList")}
      ></TextField>
      <TextField
        label="Wish list"
        isRequired={true}
        isReadOnly={false}
        value={wishList}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              shoppingList,
              wishList: value,
              currentSession,
            };
            const result = onChange(modelFields);
            value = result?.wishList ?? value;
          }
          if (errors.wishList?.hasError) {
            runValidationTasks("wishList", value);
          }
          setWishList(value);
        }}
        onBlur={() => runValidationTasks("wishList", wishList)}
        errorMessage={errors.wishList?.errorMessage}
        hasError={errors.wishList?.hasError}
        {...getOverrideProps(overrides, "wishList")}
      ></TextField>
      <TextField
        label="Current session"
        isRequired={true}
        isReadOnly={false}
        value={currentSession}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              shoppingList,
              wishList,
              currentSession: value,
            };
            const result = onChange(modelFields);
            value = result?.currentSession ?? value;
          }
          if (errors.currentSession?.hasError) {
            runValidationTasks("currentSession", value);
          }
          setCurrentSession(value);
        }}
        onBlur={() => runValidationTasks("currentSession", currentSession)}
        errorMessage={errors.currentSession?.errorMessage}
        hasError={errors.currentSession?.hasError}
        {...getOverrideProps(overrides, "currentSession")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
