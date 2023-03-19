/**
 * Metadata Selector Class used in MetadataSelector LWC component
 * @author Christopher Pezza
 * @since 2023
 */
@SuppressWarnings('PMD.StdCyclomaticComplexity')
public with sharing class MetadataSelector {
  /**
   * Custom Exception class
   */
  public class MetadataSelectorException extends Exception {
  }

  /**
   * Get List of Metadata for specific Metadata Type defined.
   * @param metadataType API name of metadata type
   * @param folderNames list of folder names (max: 3)
   * @param packageType package type (all, unamanaged, managed)
   * @return  `String`
   * @exception Invalid_Package_Types
   */
  @SuppressWarnings('PMD.CognitiveComplexity, PMD.CyclomaticComplexity')
  @AuraEnabled(cacheable=true)
  public static String listMetadata(String metadataType, List<String> folderNames, String packageType) {
    if (!MetadataUtility.PACKAGE_TYPES.contains(packageType)) {
      throw new MetadataSelectorException(System.Label.Invlid_Package_Types);
    }

    MetadataService.MetadataPort service = createService();
    List<FileProperty> files = new List<FileProperty>();
    List<MetadataService.ListMetadataQuery> queries = new List<MetadataService.ListMetadataQuery>();
    if (folderNames.size() != 0) {
      for (String foldername : folderNames) {
        MetadataService.ListMetadataQuery query = new MetadataService.ListMetadataQuery();
        query.folder = folderName;
        query.type_x = metadataType;
        queries.add(query);
      }
    } else {
      MetadataService.ListMetadataQuery query = new MetadataService.ListMetadataQuery();
      query.type_x = metadataType;
      queries.add(query);
    }

    MetadataService.FileProperties[] properties = service.listMetadata(queries, API_VERSION);

    if (properties != null) {
      for (MetadataService.FileProperties property : properties) {
        if (packageType == PACKAGETYPE_ALL) {
          files.add(
            new FileProperty(
              property.fileName,
              property.fullName,
              property.id,
              property.manageableState,
              property.namespacePrefix
            )
          );
        } else if (packageType == PACKAGETYPE_UNMANAGED) {
          if (property.namespacePrefix == null) {
            files.add(
              new FileProperty(
                property.fileName,
                property.fullName,
                property.id,
                property.manageableState,
                property.namespacePrefix
              )
            );
          }
        } else if (packageType == PACKAGETYPE_MANAGED) {
          if (property.namespacePrefix != null) {
            files.add(
              new FileProperty(
                property.fileName,
                property.fullName,
                property.id,
                property.manageableState,
                property.namespacePrefix
              )
            );
          }
        }
      }

      return JSON.serialize(files);
    } else {
      return 'NoData';
    }
  }

  /**
   * Get list of Folders for specific metadata type
   * @param metadataType API name of metadata type
   * @return  `string`
   */
  @AuraEnabled(cacheable=true)
  public static string listFolders(String metadataType) {
    List<KeyValuePair> toReturn = new List<KeyValuePair>();
    List<Folder> folders = getFolders(metadataType);

    for (Folder f : folders) {
      toReturn.add(new KeyValuePair(f.Name, f.DeveloperName));
    }

    return JSON.serialize(toReturn);
  }

  /**
   * File Property class used for showing data in LWC easily
   */
  public class FileProperty {
    public String fileName;
    public String fullName;
    public String id;
    public String manageableState;
    public String namespacePrefix;

    /**
     * Constructor for File Property to initialize
     * @param fileName name of File
     * @param fullName full name used API
     * @param id id of file
     * @param manageableState state of file managed or unmanaged
     * @param namespacePrefix namespace prefix
     */
    @SuppressWarnings('PMD.ExcessiveParameterList')
    public FileProperty(String fileName, String fullName, String id, string manageableState, String namespacePrefix) {
      this.fileName = fileName;
      this.fullName = fullName;
      this.id = id;
      this.manageableState = manageableState;
      this.namespacePrefix = namespacePrefix;
    }
  }

  /**
   * KeyValuePair to mimic SelectOption for usage in LWC
   */
  public class KeyValuePair {
    public String label;
    public String value;

    /**
     * Constructor of KeyValuePair
     * @param label label of item (key)
     * @param value value of item (value)
     */
    public KeyValuePair(String label, String value) {
      this.label = label;
      this.value = value;
    }
  }

  /**
   * Create a Metadata Service to start usage
   * @return  `MetadataService.MetadataPort`
   */
  private static MetadataService.MetadataPort createService() {
    MetadataService.MetadataPort service = new MetadataService.MetadataPort();
    service.SessionHeader = new MetadataService.SessionHeader_element();
    service.SessionHeader.sessionId = MetadataUtility.getSessionIdFromVFPage(Page.SessionId);
    return service;
  }

  /**
   * get a list of folders for a given metadata type
   * @param metadataType API of metadata type
   * @return  `List<Folder>`
   */
  private static List<Folder> getFolders(String metadataType) {
    Set<String> names = new Set<String>{ metadataType };
    if (metadataType == 'EmailTemplate') {
      names.add('Email');
    }

    return [
      SELECT Id, Name, DeveloperName
      FROM Folder
      WHERE Type IN :names AND DeveloperName != ''
      WITH SECURITY_ENFORCED
    ];
  }

  private static final Integer API_VERSION = Integer.ValueOf(MetadataUtility.API_VERSION);
  private static final String PACKAGETYPE_ALL = 'all';
  private static final String PACKAGETYPE_MANAGED = 'managedOnly';
  private static final String PACKAGETYPE_UNMANAGED = 'unmanagedOnly';
}
