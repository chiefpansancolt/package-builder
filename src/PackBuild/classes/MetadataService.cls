public with sharing class MetadataService {
  public static String SOAP_URI = 'http://soap.sforce.com/2006/04/metadata';

  public class listMetadata_element {
    public MetadataService.ListMetadataQuery[] queries;
    public Double asOfVersion;
    private String[] queries_type_info = new List<String>{ 'queries', SOAP_URI, null, '0', '-1', 'false' };
    private String[] asOfVersion_type_info = new List<String>{ 'asOfVersion', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'queries', 'asOfVersion' };
  }

  public class ListMetadataQuery {
    public String folder;
    public String type_x;
    private String[] folder_type_info = new List<String>{ 'folder', SOAP_URI, null, '0', '1', 'false' };
    private String[] type_x_type_info = new List<String>{ 'type', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'folder', 'type_x' };
  }

  public class listMetadataResponse_element {
    public MetadataService.FileProperties[] result;
    private String[] result_type_info = new List<String>{ 'result', SOAP_URI, null, '0', '-1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'result' };
  }

  public class FileProperties {
    public String createdById;
    public String createdByName;
    public DateTime createdDate;
    public String fileName;
    public String fullName;
    public String id;
    public String lastModifiedById;
    public String lastModifiedByName;
    public DateTime lastModifiedDate;
    public String manageableState;
    public String namespacePrefix;
    public String type_x;
    private String[] createdById_type_info = new List<String>{ 'createdById', SOAP_URI, null, '1', '1', 'false' };
    private String[] createdByName_type_info = new List<String>{ 'createdByName', SOAP_URI, null, '1', '1', 'false' };
    private String[] createdDate_type_info = new List<String>{ 'createdDate', SOAP_URI, null, '1', '1', 'false' };
    private String[] fileName_type_info = new List<String>{ 'fileName', SOAP_URI, null, '1', '1', 'false' };
    private String[] fullName_type_info = new List<String>{ 'fullName', SOAP_URI, null, '1', '1', 'false' };
    private String[] id_type_info = new List<String>{ 'id', SOAP_URI, null, '1', '1', 'false' };
    private String[] lastModifiedById_type_info = new List<String>{ 'lastModifiedById', SOAP_URI, null, '1', '1', 'false' };
    private String[] lastModifiedByName_type_info = new List<String>{ 'lastModifiedByName', SOAP_URI, null, '1', '1', 'false' };
    private String[] lastModifiedDate_type_info = new List<String>{ 'lastModifiedDate', SOAP_URI, null, '1', '1', 'false' };
    private String[] manageableState_type_info = new List<String>{ 'manageableState', SOAP_URI, null, '0', '1', 'false' };
    private String[] namespacePrefix_type_info = new List<String>{ 'namespacePrefix', SOAP_URI, null, '0', '1', 'false' };
    private String[] type_x_type_info = new List<String>{ 'type', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{
      'createdById',
      'createdByName',
      'createdDate',
      'fileName',
      'fullName',
      'id',
      'lastModifiedById',
      'lastModifiedByName',
      'lastModifiedDate',
      'manageableState',
      'namespacePrefix',
      'type_x'
    };
  }

  public class LogInfo {
    public String category;
    public String level;
    private String[] category_type_info = new List<String>{ 'category', SOAP_URI, null, '1', '1', 'false' };
    private String[] level_type_info = new List<String>{ 'level', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'category', 'level' };
  }

  public class SessionHeader_element {
    public String sessionId;
    private String[] sessionId_type_info = new List<String>{ 'sessionId', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'sessionId' };
  }

  public class DebuggingInfo_element {
    public String debugLog;
    private String[] debugLog_type_info = new List<String>{ 'debugLog', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'debugLog' };
  }

  public class DebuggingHeader_element {
    public MetadataService.LogInfo[] categories;
    public String debugLevel;
    private String[] categories_type_info = new List<String>{ 'categories', SOAP_URI, null, '0', '-1', 'false' };
    private String[] debugLevel_type_info = new List<String>{ 'debugLevel', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'categories', 'debugLevel' };
  }

  public class CallOptions_element {
    public String client;
    private String[] client_type_info = new List<String>{ 'client', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'client' };
  }

  public class AllOrNoneHeader_element {
    public Boolean allOrNone;
    private String[] allOrNone_type_info = new List<String>{ 'allOrNone', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'allOrNone' };
  }

  public class MetadataPort {
    public String endpoint_x = URL.getSalesforceBaseUrl().toExternalForm() + '/services/Soap/m/' + MetadataUtility.API_VERSION;
    public Map<String, String> inputHttpHeaders_x;
    public Map<String, String> outputHttpHeaders_x;
    public String clientCertName_x;
    public String clientCert_x;
    public String clientCertPasswd_x;
    public Integer timeout_x;
    public MetadataService.SessionHeader_element SessionHeader;
    public MetadataService.DebuggingInfo_element DebuggingInfo;
    public MetadataService.DebuggingHeader_element DebuggingHeader;
    public MetadataService.CallOptions_element CallOptions;
    public MetadataService.AllOrNoneHeader_element AllOrNoneHeader;
    private String SessionHeader_hns = 'SessionHeader=' + SOAP_URI;
    private String DebuggingInfo_hns = 'DebuggingInfo=' + SOAP_URI;
    private String DebuggingHeader_hns = 'DebuggingHeader=' + SOAP_URI;
    private String CallOptions_hns = 'CallOptions=' + SOAP_URI;
    private String AllOrNoneHeader_hns = 'AllOrNoneHeader=' + SOAP_URI;
    private String[] ns_map_type_info = new List<String>{ SOAP_URI, 'MetadataService' };

    public MetadataService.FileProperties[] listMetadata(MetadataService.ListMetadataQuery[] queries, Double asOfVersion) {
      MetadataService.listMetadata_element request_x = new MetadataService.listMetadata_element();
      request_x.queries = queries;
      request_x.asOfVersion = asOfVersion;
      MetadataService.listMetadataResponse_element response_x;
      Map<String, MetadataService.listMetadataResponse_element> response_map_x = new Map<String, MetadataService.listMetadataResponse_element>();
      response_map_x.put('response_x', response_x);
      WebServiceCallout.invoke(
        this,
        request_x,
        response_map_x,
        new List<String>{ endpoint_x, '', SOAP_URI, 'listMetadata', SOAP_URI, 'listMetadataResponse', 'MetadataService.listMetadataResponse_element' }
      );
      response_x = response_map_x.get('response_x');
      return response_x.result;
    }
  }
}
