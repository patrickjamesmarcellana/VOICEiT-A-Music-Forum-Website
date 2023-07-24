module.exports = async (model) => {
    const documents = await model.find({}).exec()
    console.log(`Validating ${documents.length} documents from ${model.modelName} model`)

    let errors = 0
    for(let i = 0;  i < documents.length; i++) {
        if(documents[i].validateSync() !== undefined) {
            console.log(`Error detected on ${model.modelName} id: ${documents[i]._id}`)
            errors += 1
        }
    }

    console.log(`Found ${errors} errors`)
    console.log()
} 
