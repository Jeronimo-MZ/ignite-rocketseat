import {
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, Ref } from "react";
import { FieldError } from "react-hook-form";
type InputProps = ChakraInputProps & {
    name: string;
    label?: string;
    error?: FieldError;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    { name, label, error = null, ...rest },
    ref
) => {
    return (
        <FormControl isInvalid={!!error}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <ChakraInput
                name={name}
                id={name}
                focusBorderColor="pink.500"
                bg="gray.900"
                variant="filled"
                _hover={{ bg: "gray.900" }}
                size="lg"
                {...rest}
                ref={ref}
            />
            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};

export const Input = forwardRef(InputBase);
