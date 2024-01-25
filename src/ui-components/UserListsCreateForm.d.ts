/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserListsCreateFormInputValues = {
    shoppingList?: string;
    wishList?: string;
    currentSession?: string;
};
export declare type UserListsCreateFormValidationValues = {
    shoppingList?: ValidationFunction<string>;
    wishList?: ValidationFunction<string>;
    currentSession?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserListsCreateFormOverridesProps = {
    UserListsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    shoppingList?: PrimitiveOverrideProps<TextFieldProps>;
    wishList?: PrimitiveOverrideProps<TextFieldProps>;
    currentSession?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserListsCreateFormProps = React.PropsWithChildren<{
    overrides?: UserListsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserListsCreateFormInputValues) => UserListsCreateFormInputValues;
    onSuccess?: (fields: UserListsCreateFormInputValues) => void;
    onError?: (fields: UserListsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserListsCreateFormInputValues) => UserListsCreateFormInputValues;
    onValidate?: UserListsCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserListsCreateForm(props: UserListsCreateFormProps): React.ReactElement;
