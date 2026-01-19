export const getIdParamsMatch = (params: string | undefined): string | null => {
    const match = params?.match(/[?&]id=(\d+)/);
    const idParam = match ? match[1] : null; 

    return idParam;
}