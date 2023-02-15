import {
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
type InputProps = ChakraInputProps & {
    name: string;
    label?: string;
};

export const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
    return (
        <FormControl>
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
            />
        </FormControl>
    );
};
