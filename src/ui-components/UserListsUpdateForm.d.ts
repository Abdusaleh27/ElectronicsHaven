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
export declare type UserListsUpdateFormInputValues = {
    shoppingList?: string;
    wishList?: string;
    currentSession?: string;
};
export declare type UserListsUpdateFormValidationValues = {
    shoppingList?: ValidationFunction<string>;
    wishList?: ValidationFunction<string>;
    currentSession?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserListsUpdateFormOverridesProps = {
    UserListsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    shoppingList?: PrimitiveOverrideProps<TextFieldProps>;
    wishList?: PrimitiveOverrideProps<TextFieldProps>;
    currentSession?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserListsUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserListsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userLists?: any;
    onSubmit?: (fields: UserListsUpdateFormInputValues) => UserListsUpdateFormInputValues;
    onSuccess?: (fields: UserListsUpdateFormInputValues) => void;
    onError?: (fields: UserListsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserListsUpdateFormInputValues) => UserListsUpdateFormInputValues;
    onValidate?: UserListsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserListsUpdateForm(props: UserListsUpdateFormProps): React.ReactElement;
