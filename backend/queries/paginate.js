
const API_ENDPOINT = process.env.API_ENDPOINT;

module.exports.paginateQuery = async (model, req, res, next, valueReturn) => {

    try {

        const checks = req.checks || {}
        const projection = req.projection || {}
        const populateKey = req.populateKey || []
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.limit) || 15;

        const orderBy = req.query.orderBy || "createdAt";
        const sortedBy = req.query.sortedBy;
        let sortObj = {};

        if (sortedBy == "asc") {
            sortObj = { [orderBy]: 1 };
        } else {
            sortObj = { [orderBy]: -1 };
        }

        // const populateKey = ["adminId", "nftId", "productId"]
        // const populateOptions = populateKey.map(key => ({ path: key }));
        const populateOptions = populateKey.map(item => {
            return {
                path: item?.path,
                select: item?.select?.join(' ')
            };
        });



        const totalDocuments = await model.countDocuments(checks);
        const totalPages = Math.ceil(totalDocuments / perPage);



        const documents = await model.find(checks, projection)
            .populate(populateOptions)
            .sort(sortObj)
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

            

        req.findAllResponse = documents || []
        req.oparationData = req?.oparationData || [];
        req.oparationData.map(operation => operation());
        await Promise.all(req.oparationData);



        const responseData = {
            current_page: page,
            data: documents,
            first_page_url: `${API_ENDPOINT}/products?page=1&limit=${perPage}`,
            from: (page - 1) * perPage + 1,
            last_page: totalPages,
            last_page_url: `${API_ENDPOINT}/products?page=${totalPages}&limit=${perPage}`,
            links: [
                {
                    url: null,
                    label: '&laquo; Previous',
                    active: page > 1,
                },
                ...Array.from({ length: totalPages }, (_, i) => ({
                    url: `${API_ENDPOINT}/products?page=${i + 1}&limit=${perPage}`,
                    label: `${i + 1}`,
                    active: i + 1 === page,
                })),
                {
                    url: `${API_ENDPOINT}/products?page=${page + 1}&limit=${perPage}`,
                    label: 'Next &raquo;',
                    active: page < totalPages,
                },
            ],
            next_page_url: page < totalPages ? `${API_ENDPOINT}/products?page=${page + 1}&limit=${perPage}` : null,
            path: `${API_ENDPOINT}/products`,
            per_page: perPage,
            prev_page_url: page > 1 ? `${API_ENDPOINT}/products?page=${page - 1}&limit=${perPage}` : null,
            to: Math.min(page * perPage, totalDocuments),
            total: totalDocuments,
        };
        if (valueReturn) return responseData
        req.paginateResponse = responseData

        res.json(responseData);
    } catch (error) {
        next(error);
    }
};


