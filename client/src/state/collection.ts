import { DtoCollectionWithRecord } from '../../../api/interfaces/dto_collection';
import { DtoRecord } from '../../../api/interfaces/dto_record';
import { RunResult } from '../../../api/interfaces/dto_run_result';
import { StringUtil } from '../utils/string_util';
import { RecordCategory } from '../common/record_category';
import { requestStateDefaultValue, RequestState } from './request';
import { allProject, newRecordFlag, newRequestName } from '../common/constants';
import { ParameterType } from '../common/parameter_type';

export function getDefaultRecord(isInit: boolean = false): DtoRecord {
    return {
        id: isInit ? newRecordFlag : `${newRecordFlag}${StringUtil.generateUID()}`,
        category: RecordCategory.record,
        name: newRequestName,
        collectionId: '',
        parameterType: ParameterType.All,
        headers: []
    };
}

export const getNewRecordState: () => RecordState = () => {
    const newRecord = getDefaultRecord();
    return {
        name: newRecord.name || newRequestName,
        record: newRecord,
        isChanged: false,
        isRequesting: false
    };
};

export interface CollectionState {

    collectionsInfo: DtoCollectionWithRecord;

    openKeys: string[];

    expandParamRequest: string;

    selectedProject: string;

    fetchCollectionState: RequestState;
}

export interface DisplayRecordsState {

    activeKey: string;

    recordStates: _.Dictionary<RecordState>;

    recordsOrder: string[];

    responseState: ResponseState;
}

export interface RecordState {

    name: string;

    record: DtoRecord;

    isChanged: boolean;

    isRequesting: boolean;
}

export interface ResponseState {

    [id: string]: RunResult;
}

export const collectionDefaultValue: CollectionState = {
    fetchCollectionState: requestStateDefaultValue,
    openKeys: [],
    expandParamRequest: '',
    selectedProject: allProject,
    collectionsInfo: {
        collections: {},
        records: {}
    }
};

export const displayRecordsDefaultValue: DisplayRecordsState = {
    activeKey: newRecordFlag,
    recordsOrder: [newRecordFlag],
    recordStates:
    {
        [newRecordFlag]: {
            name: newRequestName,
            record: getDefaultRecord(true),
            isChanged: false,
            isRequesting: false
        }
    },
    responseState: {}
};