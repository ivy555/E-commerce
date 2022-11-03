export const sizeTypeToInfo = (sizeType) => {
    switch (sizeType) {
        // case "XS":
        //     return "Extra Small";
        // case "S":
        //     return "Small";
        // case "M":
        //     return "Medium";
        // case "L":
        //     return "Large";
        // case "XL":
        //     return "Extra Large";
        case "XS":
            return "125 g";
        case "S":
            return "250 g";
        case "M":
            return "500 g";
        case "L":
            return "1 kg";
        case "XL":
            return "5 kg";

        default:
            return sizeType;
    }
};
