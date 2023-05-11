import { memo } from "react";

const Field = (props: any) => {
    const { item, form, getOptions } = props
    return item.render({
        getOptions,
        item,
        values: form.values
    });
}

export default memo(Field)