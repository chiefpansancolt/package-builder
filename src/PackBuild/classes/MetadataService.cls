/**
 * Metadata Service class to make calls to MetadataAPI
 * @author Christopher Pezza
 * @since 2023
 */
@SuppressWarnings('PMD.FieldNamingConventions, PMD.ExcessivePublicCount')
public with sharing class MetadataService {
  public static String SOAP_URI = 'http://soap.sforce.com/2006/04/metadata';

  /**
   * List Metadata Element Class
   */  
  @SuppressWarnings('PMD.ClassNamingConventions')
  public class listMetadata_element {
    public MetadataService.ListMetadataQuery[] queries;
    public Double asOfVersion;
    private String[] queries_type_info = new List<String>{ 'queries', SOAP_URI, null, '0', '-1', 'false' };
    private String[] asOfVersion_type_info = new List<String>{ 'asOfVersion', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'queries', 'asOfVersion' };
  }

  /**
   * List Metadata Query Class
   */  
  public class ListMetadataQuery {
    public String folder;
    public String type_x;
    private String[] folder_type_info = new List<String>{ 'folder', SOAP_URI, null, '0', '1', 'false' };
    private String[] type_x_type_info = new List<String>{ 'type', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'folder', 'type_x' };
  }

  /**
   * Describe Metadata Object
   */  
  public class DescribeMetadataObject {
    public String[] childXmlNames;
    public String directoryName;
    public Boolean inFolder;
    public Boolean metaFile;
    public String suffix;
    public String xmlName;
    private String[] childXmlNames_type_info = new List<String>{ 'childXmlNames', SOAP_URI, null, '0', '-1', 'false' };
    private String[] directoryName_type_info = new List<String>{ 'directoryName', SOAP_URI, null, '1', '1', 'false' };
    private String[] inFolder_type_info = new List<String>{ 'inFolder', SOAP_URI, null, '1', '1', 'false' };
    private String[] metaFile_type_info = new List<String>{ 'metaFile', SOAP_URI, null, '1', '1', 'false' };
    private String[] suffix_type_info = new List<String>{ 'suffix', SOAP_URI, null, '0', '1', 'false' };
    private String[] xmlName_type_info = new List<String>{ 'xmlName', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{
      'childXmlNames',
      'directoryName',
      'inFolder',
      'metaFile',
      'suffix',
      'xmlName'
    };
  }

  /**
   * Describe Metadata Result Class
   */  
  public class DescribeMetadataResult {
    public MetadataService.DescribeMetadataObject[] metadataObjects;
    public String organizationNamespace;
    public Boolean partialSaveAllowed;
    public Boolean testRequired;
    private String[] metadataObjects_type_info = new List<String>{
      'metadataObjects',
      SOAP_URI,
      null,
      '0',
      '-1',
      'false'
    };
    private String[] organizationNamespace_type_info = new List<String>{
      'organizationNamespace',
      SOAP_URI,
      null,
      '1',
      '1',
      'false'
    };
    private String[] partialSaveAllowed_type_info = new List<String>{
      'partialSaveAllowed',
      SOAP_URI,
      null,
      '1',
      '1',
      'false'
    };
    private String[] testRequired_type_info = new List<String>{ 'testRequired', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{
      'metadataObjects',
      'organizationNamespace',
      'partialSaveAllowed',
      'testRequired'
    };
  }

  /**
   * List Metadata Response Element Class
   */  
  @SuppressWarnings('PMD.ClassNamingConventions')
  public class listMetadataResponse_element {
    public MetadataService.FileProperties[] result;
    private String[] result_type_info = new List<String>{ 'result', SOAP_URI, null, '0', '-1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'result' };
  }

  /**
   * File Properties Class
   */  
  @SuppressWarnings('PMD.TooManyFields')
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
    private String[] lastModifiedById_type_info = new List<String>{
      'lastModifiedById',
      SOAP_URI,
      null,
      '1',
      '1',
      'false'
    };
    private String[] lastModifiedByName_type_info = new List<String>{
      'lastModifiedByName',
      SOAP_URI,
      null,
      '1',
      '1',
      'false'
    };
    private String[] lastModifiedDate_type_info = new List<String>{
      'lastModifiedDate',
      SOAP_URI,
      null,
      '1',
      '1',
      'false'
    };
    private String[] manageableState_type_info = new List<String>{
      'manageableState',
      SOAP_URI,
      null,
      '0',
      '1',
      'false'
    };
    private String[] namespacePrefix_type_info = new List<String>{
      'namespacePrefix',
      SOAP_URI,
      null,
      '0',
      '1',
      'false'
    };
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

  /**
   * Log Info Class
   */  
  public class LogInfo {
    public String category;
    public String level;
    private String[] category_type_info = new List<String>{ 'category', SOAP_URI, null, '1', '1', 'false' };
    private String[] level_type_info = new List<String>{ 'level', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'category', 'level' };
  }

  /**
   * Session Header Element Class
   */  
  public class SessionHeader_element {
    public String sessionId;
    private String[] sessionId_type_info = new List<String>{ 'sessionId', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'sessionId' };
  }

  /**
   * Debugging Info Element Class
   */  
  public class DebuggingInfo_element {
    public String debugLog;
    private String[] debugLog_type_info = new List<String>{ 'debugLog', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'debugLog' };
  }

  /**
   * Debugger Header Element Class
   */  
  public class DebuggingHeader_element {
    public MetadataService.LogInfo[] categories;
    public String debugLevel;
    private String[] categories_type_info = new List<String>{ 'categories', SOAP_URI, null, '0', '-1', 'false' };
    private String[] debugLevel_type_info = new List<String>{ 'debugLevel', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'categories', 'debugLevel' };
  }

  /**
   * Call Options Element Class
   */  
  public class CallOptions_element {
    public String client;
    private String[] client_type_info = new List<String>{ 'client', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'client' };
  }

  /**
   * All Or None Header Element Class
   */  
  public class AllOrNoneHeader_element {
    public Boolean allOrNone;
    private String[] allOrNone_type_info = new List<String>{ 'allOrNone', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'allOrNone' };
  }

  /**
   * Describe Metadata Element Class
   */  
  @SuppressWarnings('PMD.ClassNamingConventions')
  public class describeMetadata_element {
    public Double asOfVersion;
    private String[] asOfVersion_type_info = new List<String>{ 'asOfVersion', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'asOfVersion' };
  }

  /**
   * Describer Metadata Response Element Class
   */  
  @SuppressWarnings('PMD.ClassNamingConventions')
  public class describeMetadataResponse_element {
    public MetadataService.DescribeMetadataResult result;
    private String[] result_type_info = new List<String>{ 'result', SOAP_URI, null, '1', '1', 'false' };
    private String[] apex_schema_type_info = new List<String>{ SOAP_URI, 'true', 'false' };
    private String[] field_order_type_info = new List<String>{ 'result' };
  }

  /**
   * Metadata Port Class
   */  
  public class MetadataPort {
    public String endpoint_x =
      URL.getSalesforceBaseUrl().toExternalForm() +
      '/services/Soap/m/' +
      MetadataUtility.API_VERSION;
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

    /**
     * List Metadata based on types and api version
     * @param queries Query of Metadata Types
     * @param asOfVersion API Version
     * @return  `MetadataService.FileProperties[]`
     * @exception CalloutException
     */    
    @SuppressWarnings('PMD.LocalVariableNamingConventions')
    public MetadataService.FileProperties[] listMetadata(
      MetadataService.ListMetadataQuery[] queries,
      Double asOfVersion
    ) {
      MetadataService.listMetadata_element request_x = new MetadataService.listMetadata_element();
      request_x.queries = queries;
      request_x.asOfVersion = asOfVersion;
      MetadataService.listMetadataResponse_element response_x;
      Map<String, MetadataService.listMetadataResponse_element> response_map_x = new Map<String, MetadataService.listMetadataResponse_element>();
      response_map_x.put('response_x', response_x);
      try {
        WebServiceCallout.invoke(
          this,
          request_x,
          response_map_x,
          new List<String>{
            endpoint_x,
            '',
            SOAP_URI,
            'listMetadata',
            SOAP_URI,
            'listMetadataResponse',
            'MetadataService.listMetadataResponse_element'
          }
        );
      } catch (System.CalloutException ex) {
        throw new AuraHandledException(ex.getMessage());
      }
      response_x = response_map_x.get('response_x');
      return response_x.result;
    }

    /**
     * Describe Metadata for list of all Metadata based on api version
     * @param asOfVersion API Version
     * @return  `MetadataService.DescribeMetadataResult`
     */    
    @SuppressWarnings('PMD.LocalVariableNamingConventions')
    public MetadataService.DescribeMetadataResult describeMetadata(Double asOfVersion) {
      MetadataService.describeMetadata_element request_x = new MetadataService.describeMetadata_element();
      request_x.asOfVersion = asOfVersion;
      MetadataService.describeMetadataResponse_element response_x;
      Map<String, MetadataService.describeMetadataResponse_element> response_map_x = new Map<String, MetadataService.describeMetadataResponse_element>();
      response_map_x.put('response_x', response_x);
      WebServiceCallout.invoke(
        this,
        request_x,
        response_map_x,
        new List<String>{
          endpoint_x,
          '',
          SOAP_URI,
          'describeMetadata',
          SOAP_URI,
          'describeMetadataResponse',
          'MetadataService.describeMetadataResponse_element'
        }
      );
      response_x = response_map_x.get('response_x');
      return response_x.result;
    }
  }
}
