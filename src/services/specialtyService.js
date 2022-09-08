
import aplicationDB from '../models/index'

const saveSpecialtyInfo = async (data) => {
    try {
        const { name, image, descriptionHTML, descriptionMarkdown } = data
        if (!name || !image) {
            return {
                errCode: 1,
                errMsg: 'Missing required parameter'
            }
        }
        let specialty = await aplicationDB.Specialty.findOne({
            where: { name }
        })

        if (specialty) {
            await aplicationDB.Specialty.update(data, { where: { name } })
        } else {
            await aplicationDB.Specialty.create(data)
        }

        return {
            errCode: 0,
            errMsg: 'Save specialty successfully!'
        }

    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

const getSpecialtyInfo = async (id) => {
    try {
        if (id) {
            let specialty = await aplicationDB.Specialty.findOne({
                where: { id }
            })
            if (!specialty) {
                return {
                    errCode: 2,
                    errMsg: 'Specialty does not exist any more!'
                }
            }
            return {
                errCode: 0,
                data: specialty
            }
        }
        let specialties = await aplicationDB.Specialty.findAll({
            attributes: {
                exclude: ['descriptionHTML', 'descriptionMarkdown']
            },
        })
        return {
            errCode: 0,
            data: specialties
        }
    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

const getDoctorListBySpecialtyId = async (id, provinceId) => {
    try {
        if (!id) {
            return {
                errCode: 1,
                errMsg: 'Missing required parameter'
            }
        }
        let doctorList = await aplicationDB.Markdown.findAll({
            where: { specialtyId: id },
        })
        doctorList = doctorList.map(item => item.doctorId)

        if (!provinceId) {
            return {
                errCode: 0,
                data: doctorList
            }
        }

        let provinceList = await aplicationDB.Doctor_Info.findAll({
            where: { provinceId }
        })
        provinceList = provinceList.map(item => item.doctorId).filter(item => doctorList.includes(item))

        return {
            errCode: 0,
            data: provinceList
        }
    } catch (error) {
        console.log(error)
        return {
            errCode: -1,
            errMsg: 'Error Server!'
        }
    }
}

module.exports = {
    saveSpecialtyInfo, getSpecialtyInfo,
    getDoctorListBySpecialtyId,
}
